import { Op } from 'sequelize';
import callModel from '../../models/call/index.js';
import callStatusModel from '../../models/callStatus/index.js';
import contactModel from '../../models/contact/index.js';
import noteModel from '../../models/note/index.js';
import statusCodes from '../../shared/statusCodes.js';
import userModel from '../../models/user/index.js';

const callController = {
  createCall: async (req, res) => {
    try {
      const contactId = req.params.contactId;
      const userId = req.user.id;
      const data = req.body;

      const callStatus = await callStatusModel.findByPk(data.statusId);

      if (!callStatus) {
        return res.status(statusCodes.NOT_FOUND).json({
          message: 'Call status not found',
        });
      }

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
          message: 'Contact not found',
        });
      }

      await callModel.create({
        UserId: userId,
        contactId,
        callStatusId: data.statusId,
        ...data,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Call created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getCalls: async (req, res) => {
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

      const calls = await callModel.findAll({
        where: {
          contactId,
        },
        include: [
          { model: userModel, attributes: ['id', 'name'] },
          { model: callStatusModel, attributes: ['id', 'name'] },
        ],
        order: [['createdAt', 'asc']],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: calls,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  updateCallStatus: async (req, res) => {
    try {
      const userId = req.user.id;
      const callId = req.params.callId;
      const { statusId } = req.body;

      const call = await callModel.findByPk(callId);

      if (!call) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Call not found ',
        });
      }

      const contact = await contactModel.findOne({
        where: {
          id: call.contactId,
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

      const callStatus = await callStatusModel.findByPk(statusId);

      if (!callStatus) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Call Status not found ',
        });
      }

      await call.update({ callStatusId: statusId });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Call updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default callController;
