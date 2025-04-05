import { Router } from 'express';
import departmentController from '../../controllers/department/index.js';
import validateInput from '../../middleware/validators/common/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
import checkAdmin from '../../middleware/auth/checkAdmin.js';

const departmentRouter = Router();

departmentRouter.use(authentication, authorization(['admin', 'line manager']));

departmentRouter.post(
  '/',
  checkAdmin,
  validateInput,
  departmentController.createDepartment
);

departmentRouter.get('/', departmentController.getDepartments);

departmentRouter.put(
  '/:id',
  checkAdmin,
  validateInput,
  departmentController.updateDepartment
);

departmentRouter.delete(
  '/:id',
  checkAdmin,
  departmentController.deleteDepartment
);

export default departmentRouter;
