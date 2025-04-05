import { Router } from 'express';
import userValidator from '../../middleware/validators/user/index.js';
import userController from '../../controllers/user/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
import checkAdmin from '../../middleware/auth/checkAdmin.js';
const userRouter = Router();

// get all users
userRouter.get(
  '/',
  authentication,
  authorization(['admin', 'it admin']),
  userController.getAllUser
);

// get all line managers
userRouter.get(
  '/lineManagers',
  authentication,
  authorization(['admin', 'line manager', 'employee']),
  userController.getAllLineManagers
);

// get all employees
userRouter.get(
  '/employees',
  authentication,
  authorization(['admin', 'line manager']),
  userController.getAllEmployees
);

// search  employees
userRouter.get(
  '/search/employee/:search',
  authentication,
  authorization(['admin', 'line manager']),
  userController.searchEmployees
);

// get single user
userRouter.get(
  '/:id',
  authentication,
  authorization(['admin', 'line manager', 'it admin']),
  userController.getSingleUser
);

// update user
userRouter.put(
  '/:id',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  userValidator.updateValidator,
  userController.updateUser
);

// delete user
userRouter.delete(
  '/:id',
  authentication,
  authorization(['admin', 'line manager']),
  userController.deleteUser
);

export default userRouter;
