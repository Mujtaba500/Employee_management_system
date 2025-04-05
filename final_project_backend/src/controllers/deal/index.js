import statusCodes from '../../shared/statusCodes.js';
import contactModel from '../../models/contact/index.js';
// import companyModel from '../../models/company/index.js';
// import ownerModel from '../../models/owner/index.js';
// import industryModel from '../../models/industry/index.js';
import currencyModel from '../../models/currency/index.js';
import tagModel from '../../models/tag/index.js';
import sourceModel from '../../models/source/index.js';
import { sequelize } from '../../db/config.js';

import dealModel from '../../models/deal/index.js';
import pipeLineModel from '../../models/pipeline/index.js';
import projectModel from '../../models/project/index.js';
import userModel from '../../models/user/index.js';
import { Model } from 'sequelize';

const dealController = {
  createDeal: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      let data = req.body;
      data = {
        ...data,
        dealStatusId: data.statusId,
      };

      const pipeline = await pipeLineModel.findByPk(data.pipeLineId);

      if (!pipeline) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Pipeline does not exist',
        });
      }

      const currency = await currencyModel.findByPk(data.currencyId);

      if (!currency) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Currency does not exist',
        });
      }

      const source = await sourceModel.findByPk(data.sourceId);

      if (!source) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Source does not exist',
        });
      }

      const tags = [];
      data.tagIds.forEach(async (tagId) => {
        const tag = await tagModel.findByPk(tagId);

        if (!tag) {
          return res.status(statusCodes.NOT_FOUND).json({
            success: false,
            message: `Tag with id ${tagId} does not exist`,
          });
        }
        tags.push(tag);
      });

      const contacts = [];
      data.contactIds.forEach(async (contactId) => {
        const contact = await contactModel.findByPk(contactId);

        if (!contact) {
          return res.status(statusCodes.NOT_FOUND).json({
            success: false,
            message: `Contact with id ${tagId} does not exist`,
          });
        }
        contacts.push(contact);
      });

      const projects = [];
      data.projectIds.forEach(async (projectId) => {
        const project = await projectModel.findByPk(projectId);

        if (!project) {
          return res.status(statusCodes.NOT_FOUND).json({
            success: false,
            message: `Project with id ${tagId} does not exist`,
          });
        }
        projects.push(project);
      });

      const users = [];
      for (let userId of data.userIds) {
        const user = await userModel.findByPk(userId);

        if (!user) {
          return res.status(statusCodes.NOT_FOUND).json({
            success: false,
            message: `User with id ${userId} does not exist`,
          });
        }

        users.push(user);
      }

      const deal = await dealModel.create(data, { transaction: t });
      await deal.addTag(tags, { transaction: t });
      await deal.addProject(projects, { transaction: t });
      await deal.addContact(contacts, { transaction: t });
      await deal.addUsers(users, { transaction: t });

      await t.commit();

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Deal created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
      await t.rollback();
    }
  },
  getDeals: async (req, res) => {
    try {
      const contactId = req.params.id;

      const contact = await contactModel.findOne({
        where: {
          id: contactId,
        },
        attributes: [],
        include: [{ model: dealModel, attributes: ['id', 'name'] }],
      });

      if (!contact) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: `Contact with id ${tagId} does not exist`,
        });
      }

      res.status(statusCodes.OK).json({
        success: true,
        data: contact,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default dealController;
