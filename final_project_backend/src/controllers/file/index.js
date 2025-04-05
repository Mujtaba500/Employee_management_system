import fileModel from '../../models/file/index.js';
import signatureModel from '../../models/signature/index.js';
import userModel from '../../models/user/index.js';
import statusCodes from '../../shared/statusCodes.js';
import contactModel from '../../models/contact/index.js';
import { Op } from 'sequelize';
import documentTypeModel from '../../models/documentType/index.js';
import ownerModel from '../../models/owner/index.js';

const fileController = {
  createFile: async (req, res) => {
    try {
      const data = req.body;
      const contactId = req.params.contactId;
      const userId = req.user.id;

      const contact = await contactModel.findOne({
        where: {
          id: contactId,
          [Op.or]: [
            { created_by: userId },
            { visibility: 'Public' },
            { visibility: 'Private', private_to: userId },
            { visibility: 'Select', '$users_contacts.id$': userId },
          ],
        },
        attributes: ['id', 'visibility', 'created_by'],
        include: [
          {
            model: userModel,
            as: 'users_contacts',
            required: false,
            attributes: ['id'],
          },
        ],
      });

      if (!contact) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message:
            'Contact not found or you are not authorized to access this contact',
        });
      }

      const file = await fileModel.create({
        ...data,
        contactId,
      });

      if (data.isSigned) {
        await signatureModel.create({
          ...data,
          fileId: file.id,
        });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'File created successfully!',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getFiles: async (req, res) => {
    try {
      const userId = req.user.id;
      const contactId = req.params.contactId;

      const contact = await contactModel.findOne({
        where: {
          id: contactId,
          [Op.or]: [
            { created_by: userId },
            { visibility: 'Public' },
            { visibility: 'Private', private_to: userId },
            { visibility: 'Select', '$users_contacts.id$': userId },
          ],
        },
        attributes: ['id', 'visibility', 'created_by'],
        include: [
          {
            model: userModel,
            as: 'users_contacts',
            required: false,
            attributes: ['id'],
          },
        ],
      });

      if (!contact) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message:
            'Contact not found or you are not authorized to access this contact',
        });
      }

      const files = await fileModel.findAll({
        where: {
          contactId,
        },
        include: [
          // { model: userModel, attributes: ['id', 'name'] },
          { model: documentTypeModel, attributes: ['id', 'name'] },
          { model: ownerModel, attributes: ['id', 'name'] },
        ],
        order: [['createdAt', 'asc']],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: files,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default fileController;
