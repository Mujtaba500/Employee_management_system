import { Router } from 'express';
import attendanceValidator from '../../middleware/validators/attendance/index.js';
import attendanceController from '../../controllers/attendance/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
const attendanceRouter = Router();

// get all attendances
attendanceRouter.get(
  '/',
  authentication,
  authorization(['admin', 'line manager']),
  attendanceController.getAllAttendance
);

// get specific user attendances
// if the route is like that /attendances/user/:userId it should consider it /attendance/:id as user consider as params and this route will /attendance/:id work  so that is why we have write our route top of it so if it is not matching then it will go to next route
attendanceRouter.get(
  '/user',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  attendanceController.getSpecificUserAttendances
);

// search user attendance
attendanceRouter.get(
  '/search',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  attendanceController.getSearchUserAttendances
);

// search user attendance
attendanceRouter.get(
  '/timesheet',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  attendanceController.getSpecificUserTimesheet
);

// get single attendance
attendanceRouter.get(
  '/:id',
  authentication,
  authorization(['admin', 'line manager']),
  attendanceController.getSingleAttendance
);

// create attendance
attendanceRouter.post(
  '/',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  attendanceValidator.createAttendanceValidator,
  attendanceController.createAttendance
);

// update attendance breakin and breakOut
attendanceRouter.put(
  '/break/:attendanceId',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  attendanceValidator.updateAttendanceBreaksValidator,
  attendanceController.updateBreak
);

// update attendance checkout
attendanceRouter.put(
  '/:attendanceId',
  authentication,
  authorization(['employee', 'admin', 'line manager']),
  attendanceValidator.updateAttendanceCheckOutValidator,
  attendanceController.updateAttendance
);

// delete attendance
attendanceRouter.delete(
  '/:id',
  authentication,
  authorization(['admin', 'line manager']),
  attendanceController.deleteAttendance
);

export default attendanceRouter;
