import statusCodes from '../../shared/statusCodes.js';
import noteModel from '../../models/note/index.js';
import contactModel from '../../models/contact/index.js';
import { Op } from 'sequelize';
import userModel from '../../models/user/index.js';
import attachementModel from '../../models/attachement/index.js';
import { sequelize } from '../../db/config.js';
import commentModel from '../../models/comment/index.js';
import { statSync } from 'node:fs';

const noteController = {
  createNote: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const userId = req.user.id;
      const data = req.body;
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

      const note = await noteModel.create(
        { ...data, UserId: userId, contactId },
        { transaction: t }
      );

      for (let attachementPath of data.attachements) {
        await attachementModel.create(
          {
            noteId: note.id,
            attachement: attachementPath,
          },
          { transaction: t }
        );
      }

      await t.commit();

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Note created successfully!',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
      await t.rollback();
    }
  },
  getNotes: async (req, res) => {
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

      const notes = await noteModel.findAll({
        where: {
          contactId,
        },
        include: [
          { model: userModel, attributes: ['id', 'name'] },
          { model: attachementModel, attributes: ['id', 'attachement'] },
          {
            model: commentModel,
            attributes: ['id', 'comment', 'createdAt'],
            include: [{ model: userModel, attributes: ['id', 'name'] }],
          },
        ],
        order: [['createdAt', 'asc']],
      });

      for (let note of notes) {
        for (let attachement of note.attachements) {
          attachement.setDataValue(
            'fileSize',
            statSync(attachement.attachement).size / 1024
          );
        }
      }

      res.status(statusCodes.OK).json({
        success: true,
        data: notes,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  createComment: async (req, res) => {
    try {
      const userId = req.user.id;
      const noteId = req.params.noteId;
      const { comment } = req.body;

      const note = await noteModel.findOne({
        where: {
          id: noteId,
          [Op.or]: [
            { '$contact.created_by$': userId },
            { '$contact.visibility$': 'Public' },
            {
              '$contact.visibility$': 'Private',
              '$contact.private_to$': userId,
            },
            {
              '$contact.visibility$': 'Select',
              '$contact.users_contacts.id$': userId,
            },
          ],
        },
        include: [
          {
            model: contactModel,
            attributes: ['id', 'visibility', 'created_by', 'private_to'],
            include: [
              {
                model: userModel,
                as: 'users_contacts',
                required: false,
                attributes: ['id'],
              },
            ],
          },
        ],
      });

      if (!note) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message:
            'Note not found or you are not authorized to comment on this note',
        });
      }

      await commentModel.create({ comment, UserId: userId, noteId });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Comment created successfully!',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default noteController;
