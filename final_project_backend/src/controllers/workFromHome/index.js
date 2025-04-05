import departmentModel from '../../models/department/index.js';
import userModel from '../../models/user/index.js';
import workFromHomeModel from '../../models/workFromHome/index.js';
import statusCodes from '../../shared/statusCodes.js';

const workFromHomeController = {
  getSingleWorkFromHome: async (req, res) => {
    const { id } = req.params;

    try {
      const workFromHome = await workFromHomeModel.findOne({
        attributes: [
          'id',
          'createdAt',
          'startDate',
          'endDate',
          'reason',
          'status',
        ],
        include: [
          {
            model: userModel,
            attributes: ['name'],
            include: [{ model: departmentModel, attributes: ['name'] }],
          },
        ],
        where: {
          id: id,
        },
      });

      if (!workFromHome) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: 'workFromHome not found' });
      }

      res.status(statusCodes.OK).json({
        success: true,
        data: workFromHome,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getSpecificUserWorkFromHome: async (req, res) => {
    const { id } = req.user;
    const { userId } = req.query;

    try {
      const userWorkFromHome = await workFromHomeModel.findAll({
        attributes: [
          'id',
          'createdAt',
          'startDate',
          'endDate',
          'reason',
          'status',
        ],
        include: [
          {
            model: userModel,
            attributes: ['name'],
            include: [{ model: departmentModel, attributes: ['name'] }],
          },
        ],
        order: [['createdAt', 'DESC']],
        where: {
          userId: userId ? userId : id,
        },
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: userWorkFromHome,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  filterSpecificUserWorkFromHome: async (req, res) => {
    const { id } = req.user;
    const { status } = req.params;
    const { userId } = req.query;

    try {
      const userWorkFromHome = await workFromHomeModel.findAll({
        attributes: [
          'id',
          'createdAt',
          'startDate',
          'endDate',
          'reason',
          'status',
        ],
        include: [
          {
            model: userModel,
            attributes: ['name'],
            include: [{ model: departmentModel, attributes: ['name'] }],
          },
        ],
        order: [['createdAt', 'DESC']],
        where: {
          userId: userId ? userId : id,
          status: status,
        },
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: userWorkFromHome,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getAllWorkFromHome: async (req, res) => {
    try {
      const workFromHome = await workFromHomeModel.findAll({
        attributes: [
          'id',
          'createdAt',
          'startDate',
          'endDate',
          'reason',
          'status',
        ],
        include: [
          {
            model: userModel,
            attributes: ['name'],
            include: [{ model: departmentModel, attributes: ['name'] }],
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: workFromHome,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getEmployeesWorkFromHome: async (req, res) => {
    const { id } = req.user;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    try {
      const { count, rows } = await workFromHomeModel.findAndCountAll({
        attributes: [
          'id',
          'createdAt',
          'startDate',
          'endDate',
          'reason',
          'status',
        ],
        include: [
          {
            model: userModel,
            attributes: ['name'],
            where: { lineManagerId: id },
            include: [{ model: departmentModel, attributes: ['name'] }],
          },
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

  filterEmployeesWorkFromHome: async (req, res) => {
    const { status } = req.params;
    const { id } = req.user;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    try {
      const { count, rows } = await workFromHomeModel.findAndCountAll({
        where: { status: status },
        attributes: [
          'id',
          'createdAt',
          'startDate',
          'endDate',
          'reason',
          'status',
        ],
        include: [
          {
            model: userModel,
            attributes: ['name'],
            where: { lineManagerId: id },
            include: [{ model: departmentModel, attributes: ['name'] }],
          },
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

  createWorkFromHome: async (req, res) => {
    const { startDate, endDate, reason } = req.body;
    const { id } = req.user;

    try {
      await workFromHomeModel.create({
        startDate: startDate,
        endDate: endDate,
        reason: reason,
        status: 'Pending',
        userId: id,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'workFromHome created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  updateWorkFromHome: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updatedworkFromHome = await workFromHomeModel.update(
        {
          status: status,
        },
        {
          where: { id: id },
        }
      );

      if (updatedworkFromHome === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `workFromHome having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'workFromHome updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  deleteWorkFromHome: async (req, res) => {
    const { id } = req.params;

    try {
      const deleteworkFromHome = await workFromHomeModel.destroy({
        where: { id: id },
      });

      if (deleteworkFromHome === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `workFromHome having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'workFromHome deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default workFromHomeController;
