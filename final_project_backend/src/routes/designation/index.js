import { Router } from 'express';
import designationController from '../../controllers/designation/index.js';
import validateDesignationInput from '../../middleware/validators/designation/index.js';
import validateInput from '../../middleware/validators/common/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
import checkAdmin from '../../middleware/auth/checkAdmin.js';

const designationRouter = Router();

designationRouter.use(authentication, authorization(['admin', 'line manager']));

designationRouter.post(
  '/:deptId',
  checkAdmin,
  validateInput,
  designationController.createdesignation
);

designationRouter.get('/', designationController.getdesignations);

designationRouter.put(
  '/:id',
  checkAdmin,
  validateDesignationInput,
  designationController.updatedesignation
);

designationRouter.delete(
  '/:id',
  checkAdmin,
  designationController.deletedesignation
);

export default designationRouter;
