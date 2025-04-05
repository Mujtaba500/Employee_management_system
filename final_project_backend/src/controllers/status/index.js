import statusModel from '../../models/status/index.js';
import statusCodes from '../../shared/statusCodes.js';

const statusController = {
  getSingleStatus: async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: 'id should be number',
      });
    }

    try {
      const status = await statusModel.findOne({
        where: {
          id: id,
        },
      });

      if (!status) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: 'status not found' });
      }

      res.status(statusCodes.OK).json({
        success: true,
        data: status,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getAllStatus: async (req, res) => {
    try {
      const status = await statusModel.findAll();

      res.status(statusCodes.OK).json({
        success: true,
        data: status,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  createStatus: async (req, res) => {
    const { name } = req.body;

    try {
      await statusModel.create({
        name: name,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'status created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  updateStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updatedStatus = await statusModel.update(
        { status: status },
        {
          where: { id: id },
        }
      );

      if (updatedStatus === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `status having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'status updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  deleteStatus: async (req, res) => {
    const { id } = req.params;

    try {
      const deleteStatus = await statusModel.destroy({
        where: { id: id },
      });

      if (deleteStatus === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `status having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'status deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default statusController;
