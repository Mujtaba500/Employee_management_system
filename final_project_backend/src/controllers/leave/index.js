import leaveModel from '../../models/leave/index.js';
import departmentModel from '../../models/department/index.js';
import userModel from '../../models/user/index.js';
import leaveTypeModel from '../../models/leaveType/index.js';
import statusCodes from '../../shared/statusCodes.js';

const leaveController = {
  getSingleLeave: async (req, res) => {
    const { id } = req.params;

    try {
      const leave = await leaveModel.findOne({
        where: {
          id: id,
        },
      });

      if (!leave) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: 'leave not found' });
      }

      res.status(statusCodes.OK).json({
        success: true,
        data: leave,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getAllLeave: async (req, res) => {
    try {
      const leave = await leaveModel.findAll({
        attributes: [
          'id',
          'createdAt',
          'fromDate',
          'toDate',
          'reason',
          'status',
          'leaveTaken',
        ],
        include: [
          {
            model: userModel,
            attributes: ['name'],
            include: [{ model: departmentModel, attributes: ['name'] }],
          },
          { model: leaveTypeModel, attributes: ['name'] },
        ],
        order: [['createdAt', 'DESC']],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: leave,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getAllEmployeesLeaves: async (req, res) => {
    const { id } = req.user;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    try {
      const { count, rows } = await leaveModel.findAndCountAll({
        attributes: [
          'id',
          'createdAt',
          'fromDate',
          'toDate',
          'reason',
          'status',
          'leaveTaken',
        ],
        include: [
          {
            model: userModel,
            attributes: ['name'],
            where: { lineManagerId: id },
            include: [{ model: departmentModel, attributes: ['name'] }],
          },
          { model: leaveTypeModel, attributes: ['name'] },
        ],
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset,
      });

      res.status(200).json({
        success: true,
        data: rows,
        totalRecords: count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },

  getFilterLeaves: async (req, res) => {
    const { status } = req.params;
    const { id } = req.user;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    try {
      const { count, rows } = await leaveModel.findAndCountAll({
        attributes: [
          'id',
          'createdAt',
          'fromDate',
          'toDate',
          'reason',
          'status',
          'leaveTaken',
        ],
        include: [
          {
            model: userModel,
            attributes: ['name'],
            where: { lineManagerId: id },
            include: [{ model: departmentModel, attributes: ['name'] }],
          },
          { model: leaveTypeModel, attributes: ['name'] },
        ],
        where: { status: status },
        order: [['createdAt', 'DESC']],
        limit: limit,
        offset: offset,
      });

      res.status(200).json({
        success: true,
        data: rows,
        totalRecords: count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },

  getSpecificUserLeaves: async (req, res) => {
    const { id } = req.user;
    const { userId } = req.query;

    try {
      const userLeaves = await leaveModel.findAll({
        include: [
          { model: userModel, attributes: ['name'] },
          { model: leaveTypeModel, attributes: ['name'] },
        ],
        where: {
          userId: userId ? userId : id,
        },
        attributes: [
          'id',
          'createdAt',
          'fromDate',
          'toDate',
          'reason',
          'leaveTaken',
          'status',
        ],
        order: [['createdAt', 'DESC']],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: userLeaves,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getUserLeavesDetails: async (req, res) => {
    const { id } = req.user;
    const { userId } = req.query;

    try {
      const userLeaves = await leaveModel.findAll({
        where: {
          userId: userId ? userId : id,
          status: 'Approved',
        },
        attributes: ['leaveTaken'],
        include: [{ model: leaveTypeModel, attributes: ['name', 'allowed'] }],
      });

      const leavesAllowed = await leaveTypeModel.findAll({
        attributes: ['name', 'allowed'],
      });

      // calculate total taken leaves
      let totalLeavesTaken = 0;
      for (const item of userLeaves) {
        totalLeavesTaken += item.leaveTaken;
      }

      // calculate total allowed leaves
      let totallAllowedLeaves = 0;
      for (const item of leavesAllowed) {
        totallAllowedLeaves += item.allowed;
      }

      // remaining leaves
      const remaingLeaves = totallAllowedLeaves - totalLeavesTaken;

      // calculate leaves usage
      const leavesUsage = {};
      userLeaves.forEach((item) => {
        const leaveType = item.LeaveType.name;
        if (leavesUsage[leaveType]) {
          leavesUsage[leaveType] += item.leaveTaken;
        } else {
          leavesUsage[leaveType] = item.leaveTaken;
        }
      });

      // calculate the leaves
      const userLeavesDetails = leavesAllowed.map((item) => {
        const leaveType = item.name;
        const allowed = item.allowed;
        const used = leavesUsage[leaveType] || 0;
        const remaining = allowed - used;
        return { leaveType, allowed, used, remaining };
      });

      // userLeavesDetails.push({ remaingLeaves: remaingLeaves });

      const detail = {
        userLeavesDetails: userLeavesDetails,
        remaingLeaves: remaingLeaves,
      };

      res.status(statusCodes.OK).json({
        success: true,
        data: detail,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  createLeave: async (req, res) => {
    const { fromDate, toDate, reason, leaveTypeId } = req.body;
    const { id } = req.user;

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const totalLeaveDays = endDate - startDate;

    // Convert milliseconds to days
    const millisecondsInOneDay = 1000 * 60 * 60 * 24; // 1 day = 86400000 milliseconds
    const differenceInDays = Math.floor(totalLeaveDays / millisecondsInOneDay); // we use Math.floor as it will give us round figure not fraction number

    try {
      const leaveType = await leaveTypeModel.findOne({
        where: { id: leaveTypeId },
      });

      if (!leaveType) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: 'Leave type not found' });
      }

      const allowedLeaves = leaveType.allowed;

      const leavesTaken = await leaveModel.sum('leaveTaken', {
        where: { userId: id, leaveTypeId },
      });

      const totalLeavesAfterRequest = (leavesTaken || 0) + differenceInDays;

      if (totalLeavesAfterRequest > allowedLeaves) {
        return res.status(statusCodes.BAD_REQUEST).json({
          success: false,
          message: `You can't applied more then your allowed leaves (${allowedLeaves})`,
        });
      }

      await leaveModel.create({
        fromDate: fromDate,
        toDate: toDate,
        reason: reason,
        leaveTaken: differenceInDays,
        status: 'Pending',
        leaveTypeId: leaveTypeId,
        userId: id,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'leave created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  updateLeave: async (req, res) => {
    const { id } = req.params;
    const {
      fromDate,
      toDate,
      reason,
      leaveTaken,
      userId,
      status,
      leaveTypeId,
    } = req.body;

    try {
      const updatedleave = await leaveModel.update(
        {
          fromDate: fromDate,
          toDate: toDate,
          reason: reason,
          leaveTaken: leaveTaken,
          status: status,
          leaveTypeId: leaveTypeId,
          userId: userId,
        },
        {
          where: { id: id },
        }
      );

      if (updatedleave === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `leave having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'leave updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  deleteLeave: async (req, res) => {
    const { id } = req.params;

    try {
      const deleteleave = await leaveModel.destroy({
        where: { id: id },
      });

      if (deleteleave === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `leave having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'leave deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default leaveController;
