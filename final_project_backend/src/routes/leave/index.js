import { Router } from 'express';
import leaveController from '../../controllers/leave/index.js';
import leaveValidator from '../../middleware/validators/leave/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
const leaveRouter = Router();

// get all leaves
leaveRouter.get(
  '/',
  authentication,
  authorization(['admin', 'line manager']),
  leaveController.getAllLeave
);

// get all employees leaves
leaveRouter.get(
  '/employees',
  authentication,
  authorization(['admin', 'line manager']),
  leaveController.getAllEmployeesLeaves
);

// get user leaves details
leaveRouter.get(
  '/details',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  leaveController.getUserLeavesDetails
);

// get specific user leaves
leaveRouter.get(
  '/user',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  leaveController.getSpecificUserLeaves
);

// filter emplyee leaves
leaveRouter.get(
  '/filter/:status',
  authentication,
  authorization(['admin', 'line manager']),
  leaveController.getFilterLeaves
);

// get single leave
leaveRouter.get(
  '/:id',
  authentication,
  authorization(['admin', 'line manager']),
  leaveController.getSingleLeave
);

// create user leave
leaveRouter.post(
  '/',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  leaveValidator.createLeaveValidator,
  leaveController.createLeave
);

// update leave
leaveRouter.put(
  '/:id',
  authentication,
  authorization(['admin', 'line manager']),
  leaveValidator.updateLeaveValidator,
  leaveController.updateLeave
);

// delete leave
leaveRouter.delete(
  '/:id',
  authentication,
  authorization(['admin', 'line manager']),
  leaveController.deleteLeave
);

export default leaveRouter;
