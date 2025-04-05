import { Router } from 'express';
import workFromHomeValidator from '../../middleware/validators/workFromHome/index.js';
import workFromHomeController from '../../controllers/workFromHome/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
const workFromHomeRouter = Router();

// get all workFromHomes
workFromHomeRouter.get(
  '/',
  authentication,
  authorization(['admin', 'line manager']),
  workFromHomeController.getAllWorkFromHome
);

// get employees workFromHomes
workFromHomeRouter.get(
  '/employees',
  authentication,
  authorization(['admin', 'line manager']),
  workFromHomeController.getEmployeesWorkFromHome
);

// filter work from home
workFromHomeRouter.get(
  '/filter/:status',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  workFromHomeController.filterEmployeesWorkFromHome
);

// get specific user workFromHome
workFromHomeRouter.get(
  '/user',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  workFromHomeController.getSpecificUserWorkFromHome
);

// filter user work from home
workFromHomeRouter.get(
  '/user/:status',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  workFromHomeController.filterSpecificUserWorkFromHome
);

// get single workFromHome
workFromHomeRouter.get(
  '/:id',
  authentication,
  authorization(['admin', 'line manager']),
  workFromHomeController.getSingleWorkFromHome
);

// create workFromHome
workFromHomeRouter.post(
  '/',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  workFromHomeValidator.createValidator,
  workFromHomeController.createWorkFromHome
);

// update workFromHome
workFromHomeRouter.put(
  '/:id',
  authentication,
  authorization(['admin', 'line manager']),
  workFromHomeValidator.updateValidator,
  workFromHomeController.updateWorkFromHome
);

// delete workFromHome
workFromHomeRouter.delete(
  '/:id',
  authentication,
  authorization(['admin', 'line manager']),
  workFromHomeController.deleteWorkFromHome
);

export default workFromHomeRouter;
