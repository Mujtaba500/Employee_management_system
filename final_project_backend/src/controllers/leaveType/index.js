import leaveTypeModel from '../../models/leaveType/index.js';
import statusCodes from '../../shared/statusCodes.js';

const leaveTypeController = {
  getSingleLeaveType: async (req, res) => {
    const { id } = req.params;

    try {
      const leaveType = await leaveTypeModel.findOne({
        attributes: ['id', 'name'],
        where: {
          id: id,
        },
      });

      if (!leaveType) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: 'leaveType not found' });
      }

      res.status(statusCodes.OK).json({
        success: true,
        data: leaveType,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getAllLeaveType: async (req, res) => {
    try {
      const leaveType = await leaveTypeModel.findAll({
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: leaveType,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  createLeaveType: async (req, res) => {
    const { name, allowed } = req.body;

    try {
      await leaveTypeModel.create({
        name: name,
        allowed: allowed,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'leave Type created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  updateLeaveType: async (req, res) => {
    const { id } = req.params;
    const { name, allowed } = req.body;

    try {
      const updatedLeaveType = await leaveTypeModel.update(
        { name: name, allowed: allowed },
        {
          where: { id: id },
        }
      );

      if (updatedLeaveType === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `leaveType having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'leaveType updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  deleteLeaveType: async (req, res) => {
    const { id } = req.params;

    try {
      const deleteLeaveType = await leaveTypeModel.destroy({
        where: { id: id },
      });

      if (deleteLeaveType === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `leaveType having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'leaveType deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default leaveTypeController;
