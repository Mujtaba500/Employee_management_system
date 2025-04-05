import attendanceModel from '../../models/attendance/index.js';
import userModel from '../../models/user/index.js';
import statusCodes from '../../shared/statusCodes.js';
import { Op, Sequelize } from 'sequelize';

const attendanceController = {
  getSingleAttendance: async (req, res) => {
    const { id } = req.params;

    try {
      const attendance = await attendanceModel.findOne({
        where: {
          id: id,
        },
      });

      if (!attendance) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: 'attendance not found' });
      }

      res.status(statusCodes.OK).json({
        success: true,
        data: attendance,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getSpecificUserAttendances: async (req, res) => {
    const { id } = req.user;
    const { userId } = req.query;

    try {
      const userAttendances = await attendanceModel.findAll({
        where: {
          userId: userId ? userId : id,
        },
        attributes: [
          'id',
          'checkin',
          'checkinStatus',
          'checkout',
          'checkoutStatus',
          'breakIn',
          'breakOut',
          'totalBreakTime',
          'createdAt',
        ],
        include: [{ model: userModel, attributes: ['id', 'name'] }],
        order: [['createdAt', 'DESC']],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: userAttendances,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getSpecificUserTimesheet: async (req, res) => {
    const { id } = req.user;
    const { userId } = req.query;

    try {
      const userDetails = await userModel.findOne({
        where: {
          id: userId ? userId : id,
        },
      });

      console.log('ssss', userDetails);

      const userAttendances = await attendanceModel.findAll({
        where: {
          userId: userId ? userId : id,
        },
        attributes: [
          [
            Sequelize.fn('DATE', Sequelize.col('Attendance.created_at')),
            'date',
          ],
          [
            Sequelize.fn('MIN', Sequelize.col('Attendance.checkin')),
            'firstCheckin',
          ],
          [
            Sequelize.fn('MIN', Sequelize.col('Attendance.checkin_status')),
            'checkinStatus',
          ],
          [
            Sequelize.fn('MAX', Sequelize.col('Attendance.checkout')),
            'lastCheckout',
          ],
          [
            Sequelize.fn('MAX', Sequelize.col('Attendance.checkout_status')),
            'checkoutStatus',
          ],
          [
            Sequelize.fn('SUM', Sequelize.col('Attendance.total_break_time')),
            'totalBreakTime',
          ],
        ],
        include: [
          { model: userModel, attributes: ['id', 'name', 'servingHours'] },
        ],
        group: [Sequelize.fn('DATE', Sequelize.col('Attendance.created_at'))], // Group by date
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json({
        success: true,
        data: userAttendances,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },

  getSearchUserAttendances: async (req, res) => {
    const { id } = req.user;
    const { fromDate, toDate } = req.query;
    const { userId } = req.query;

    if (!fromDate || !toDate) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: 'form data and to data are required',
      });
    }

    // the filter willl not work properly so we have to set UTC time of dates
    const startDate = new Date(fromDate + 'T00:00:00.000Z'); // set to start of the day
    const endDate = new Date(toDate + 'T23:59:59.999Z'); // End of the day in UTC

    try {
      const searchUserAttendances = await attendanceModel.findAll({
        where: {
          userId: userId ? userId : id,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        attributes: [
          'id',
          'checkin',
          'checkinStatus',
          'checkout',
          'checkoutStatus',
          'breakIn',
          'breakOut',
          'totalBreakTime',
          'createdAt',
        ],
        include: [{ model: userModel, attributes: ['id', 'name'] }],
        order: [['createdAt', 'DESC']],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: searchUserAttendances,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getAllAttendance: async (req, res) => {
    try {
      const attendance = await attendanceModel.findAll({
        attributes: [
          'id',
          'checkin',
          'checkinStatus',
          'checkout',
          'checkoutStatus',
          'breakIn',
          'breakOut',
          'totalBreakTime',
          'createdAt',
        ],
        include: [{ model: userModel, attributes: ['id', 'name'] }],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: attendance,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  createAttendance: async (req, res) => {
    const { checkin } = req.body;
    const { id } = req.user;

    try {
      //check the user has a null checkout or not
      const nullCheckout = await attendanceModel.findAll({
        where: { checkout: { [Op.is]: null }, userId: id },
      });

      if (nullCheckout.length > 0) {
        return res.status(statusCodes.BAD_REQUEST).json({
          success: false,
          message: 'you have to checkout first before creating new attendence',
        });
      }

      const user = await userModel.findOne({ where: { id: id } });

      // Convert user.fromTime and checkinTime to date objects for comparison
      const startTimeDate = new Date(`1970-01-01T${user.startTime}Z`);

      const tempraryCheckIn = checkin.slice(11, 19);
      const checkinTimeDate = new Date(`1970-01-01T${tempraryCheckIn}Z`);

      // Add 30 minutes to the user's fromTime to ive some coution time to user
      const cushionTime = new Date(startTimeDate.getTime() + 30 * 60 * 1000);
      const checkInStatus = checkinTimeDate <= cushionTime ? 'On Time' : 'Late';

      await attendanceModel.create({
        checkin: checkin,
        checkinStatus: checkInStatus,
        userId: id,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'attendance created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  updateAttendance: async (req, res) => {
    const { attendanceId } = req.params;
    const { checkout } = req.body;
    const { id } = req.user;

    try {
      // we have to get the user so we can get the get the checkout status
      const user = await userModel.findOne({ where: { id: id } });

      if (!user) {
        return res.status(statusCodes.BAD_REQUEST).json({
          success: false,
          message: 'no user found',
        });
      }

      const nullCheckout = await attendanceModel.findOne({
        where: { checkout: { [Op.is]: null } },
      });

      if (!nullCheckout) {
        return res.status(statusCodes.BAD_REQUEST).json({
          success: false,
          message: 'you have to create the attendence first',
        });
      }

      const userServingHours = user.servingHours;
      const userCheckinTimeDate = new Date(nullCheckout.checkin);
      const userCheckoutTimeDate = new Date(checkout);

      // if checkout time smalller then checkin time we will return it
      if (userCheckoutTimeDate < userCheckinTimeDate) {
        return res.status(statusCodes.BAD_REQUEST).json({
          message: 'Checkout time date cannot be before that checkin time date',
        });
      }

      const differenceMs = userCheckoutTimeDate - userCheckinTimeDate;

      // Convert milliseconds to hours
      const differenceHours = differenceMs / (1000 * 60 * 60); // Convert ms to hours

      console.log('differenceMs', differenceMs);
      console.log('differenceHours', differenceHours);
      console.log('userServingHours', userServingHours);

      const checkoutStatus =
        differenceHours >= userServingHours ? 'On Time' : 'Early';

      const updatedAttendance = await attendanceModel.update(
        {
          checkout: checkout,
          checkoutStatus: checkoutStatus,
        },
        {
          where: { id: attendanceId },
        }
      );

      // updateAttendence give us array
      if (updatedAttendance[0] === 0) {
        return res.status(statusCodes.NOT_FOUND).json({
          message: `attendance having id ${attendanceId} is not found`,
        });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'attendance updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  updateBreak: async (req, res) => {
    const { attendanceId } = req.params;
    const { breakIn, breakOut } = req.body;
    const { id } = req.user;

    try {
      const nullCheckout = await attendanceModel.findOne({
        where: { checkout: { [Op.is]: null }, userId: id },
      });

      if (!nullCheckout) {
        return res.status(statusCodes.BAD_REQUEST).json({
          success: false,
          message: 'you have to checkin first',
        });
      }

      if (breakIn) {
        const updatedAttendance = await attendanceModel.update(
          {
            breakIn: breakIn,
            breakOut: null,
          },
          {
            where: { id: attendanceId },
          }
        );

        // updateAttendence give us array
        if (updatedAttendance[0] === 0) {
          return res.status(statusCodes.NOT_FOUND).json({
            message: `attendance having id ${attendanceId} is not found`,
          });
        }

        res.status(statusCodes.OK).json({
          success: true,
          message: 'attendance updated successfully',
        });
      } else if (breakOut) {
        const breakin = nullCheckout.breakIn.toISOString();
        console.log('breakin', breakin);
        const breakinTime = breakin.slice(11, 19);
        const breakOutTime = breakOut.slice(11, 19);

        const breakinTimeDate = new Date(`1970-01-01T${breakinTime}Z`);
        const breakOutTimeDate = new Date(`1970-01-01T${breakOutTime}Z`);

        const breaktimeMs = breakOutTimeDate - breakinTimeDate;
        const breaktimeMinutes = breaktimeMs / (1000 * 60);
        const updatedAttendance = await attendanceModel.update(
          {
            breakOut: breakOut,
            totalBreakTime:
              (nullCheckout.totalBreakTime || 0) + breaktimeMinutes,
          },
          {
            where: { id: attendanceId },
          }
        );

        // updateAttendence give us array
        if (updatedAttendance[0] === 0) {
          return res.status(statusCodes.NOT_FOUND).json({
            message: `attendance having id ${attendanceId} is not found`,
          });
        }

        res.status(statusCodes.OK).json({
          success: true,
          message: 'attendance updated successfully',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  deleteAttendance: async (req, res) => {
    const { id } = req.params;

    try {
      const deleteattendance = await attendanceModel.destroy({
        where: { id: id },
      });

      if (deleteattendance === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `attendance having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'attendance deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default attendanceController;
