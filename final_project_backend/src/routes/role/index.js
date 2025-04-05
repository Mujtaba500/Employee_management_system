import { Router } from 'express';
import roleController from '../../controllers/role/index.js';
import roleValidator from '../../middleware/validators/role/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
const roleRouter = Router();

// get all roles
roleRouter.get(
  '/',
  // authentication,
  // authorization(['employees', 'admin', 'line manager']),
  roleController.getAllRoles
);

// get single role
roleRouter.get('/role/:id', roleController.getSingleRole);

// create role
roleRouter.post(
  '/',
  // authentication,
  // authorization(['employees', 'admin', 'line manager']),
  roleValidator.validator,
  roleController.createRole
);

// update role
roleRouter.put(
  '/:id',
  // authentication,
  // authorization(['admin']),
  roleValidator.validator,
  roleController.updateRole
);

// delete role
roleRouter.delete(
  '/:id',
  // authentication,
  // authorization(['admin']),
  roleController.deleteRole
);

export default roleRouter;
