import callStatusModel from '../../models/callStatus/index.js';
import contactStatusModel from '../../models/contactStatus/index.js';
import countryModel from '../../models/country/index.js';
import currencyModel from '../../models/currency/index.js';
import dealStatusModel from '../../models/dealStatus/index.js';
import documentTypeModel from '../../models/documentType/index.js';
import languageModel from '../../models/language/index.js';
import localeModel from '../../models/locale/index.js';
import pipeLineModel from '../../models/pipeline/index.js';
import projectModel from '../../models/project/index.js';
import reviewModel from '../../models/review/index.js';
import sourceModel from '../../models/source/index.js';
import tagModel from '../../models/tag/index.js';
import statusCodes from '../../shared/statusCodes.js';

const singleRouteController = {
  getCurrencies: async (req, res) => {
    try {
      const currencies = await currencyModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'currency'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: currencies,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getTags: async (req, res) => {
    try {
      const tags = await tagModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: tags,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getSources: async (req, res) => {
    try {
      const sources = await sourceModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: sources,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getContactStatuses: async (req, res) => {
    try {
      const contactStatuses = await contactStatusModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: contactStatuses,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getLanguages: async (req, res) => {
    try {
      const languages = await languageModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: languages,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getReviews: async (req, res) => {
    try {
      const reviews = await reviewModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getCountries: async (req, res) => {
    try {
      const countries = await countryModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: countries,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getPipeLines: async (req, res) => {
    try {
      const pipelines = await pipeLineModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: pipelines,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getDealStatuses: async (req, res) => {
    try {
      const dealStatuses = await dealStatusModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: dealStatuses,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getProjects: async (req, res) => {
    try {
      const projects = await projectModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getCallStatuses: async (req, res) => {
    try {
      const callStatuses = await callStatusModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: callStatuses,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getLocales: async (req, res) => {
    try {
      const locales = await localeModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: locales,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getDocumentTypes: async (req, res) => {
    try {
      const documentTypes = await documentTypeModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: documentTypes,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  uploadFile: async (req, res) => {
    try {
      console.log(req.file);

      res.status(statusCodes.OK).json({
        success: true,
        data: req.file.path,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default singleRouteController;
