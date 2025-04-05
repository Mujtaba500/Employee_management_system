import emailModel from '../../models/email/index.js';
import userModel from '../../models/user/index.js';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import contactModel from '../../models/contact/index.js';
import { Op } from 'sequelize';
import statusCodes from '../../shared/statusCodes.js';

const emailController = {
  createEmail: async (req, res) => {
    try {
      const data = req.body;
      const userId = req.user.id;
      const name = req.user.name;

      const contact = await contactModel.findOne({
        where: {
          id: data.contactId,
          [Op.or]: [
            { created_by: userId },
            { visibility: 'Public' },
            { visibility: 'Private', private_to: userId },
            { visibility: 'Select', '$users_contacts.id$': userId },
          ],
        },
        attributes: ['id', 'visibility', 'created_by', 'email'],
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

      const password = process.env.EMAIL_APP_PASSWORD;
      const email = process.env.ADMIN_EMAIL;

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: email,
          pass: password,
        },
      });

      const mailOptions = {
        from: `${name} ${email}`,
        to: contact.email,
        subject: data.subject,
        text: data.content,
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error('Error sending email: ', error);
          return res.status(500).json({
            message: 'Error in sending email',
          });
        } else {
          console.log('Email sent: ', info.response);

          await emailModel.create({
            ...data,
            from: userId,
            to: contact.id,
          });

          res.status(statusCodes.OK).json({
            success: true,
            message: 'Email sent!',
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getEmails: async (req, res) => {
    try {
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
        attributes: ['id', 'visibility', 'created_by', 'email'],
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

      const emails = await emailModel.findAll({
        to: contact.id,
        include: [{ model: userModel, attributes: ['id', 'name'] }],
        order: [['createdAt', 'asc']],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: emails,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default emailController;
