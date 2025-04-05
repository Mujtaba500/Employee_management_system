import { Router } from 'express';
import leaveTypeController from '../../controllers/leaveType/index.js';
import leaveTypeValidator from '../../middleware/validators/leaveType/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
const leaveTypeRouter = Router();

// get all leaveTypes
leaveTypeRouter.get(
  '/',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  leaveTypeController.getAllLeaveType
);

// get single leaveType
leaveTypeRouter.get(
  '/:id',
  authentication,
  authorization(['admin']),
  leaveTypeController.getSingleLeaveType
);

// create leaveType
leaveTypeRouter.post(
  '/',
  authentication,
  authorization(['admin']),
  leaveTypeValidator.validator,
  leaveTypeController.createLeaveType
);

// update leaveType
leaveTypeRouter.put(
  '/:id',
  authentication,
  authorization(['admin']),
  leaveTypeValidator.validator,
  leaveTypeController.updateLeaveType
);

// delete leaveType
leaveTypeRouter.delete(
  '/:id',
  authentication,
  authorization(['admin']),
  leaveTypeController.deleteLeaveType
);

export default leaveTypeRouter;
