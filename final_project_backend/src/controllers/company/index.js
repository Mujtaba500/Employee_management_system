import companyModel from '../../models/company/index.js';
import statusCodes from '../../shared/statusCodes.js';

const companyController = {
  createCompany: async (req, res) => {
    const { name } = req.body;

    try {
      await companyModel.create({
        name: name,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Company created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getAllCompanies: async (req, res) => {
    try {
      const companies = await companyModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: companies,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default companyController;
