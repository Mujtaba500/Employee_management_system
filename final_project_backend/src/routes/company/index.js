import { Router } from 'express';
import companyController from '../../controllers/company/index.js';
import validateInput from '../../middleware/validators/common/index.js';

const companyRouter = Router();

companyRouter.post('/', validateInput, companyController.createCompany);

companyRouter.get('/', companyController.getAllCompanies);

export default companyRouter;
