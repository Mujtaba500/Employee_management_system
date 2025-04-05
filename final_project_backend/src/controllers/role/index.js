import roleModel from '../../models/role/index.js';
import statusCodes from '../../shared/statusCodes.js';

const roleController = {
  getSingleRole: async (req, res) => {
    const { id } = req.params;

    try {
      const role = await roleModel.findOne({
        attributes: ['id', 'name'],
        where: {
          id: id,
        },
      });

      if (!role) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: 'role not found' });
      }

      res.status(statusCodes.OK).json({
        success: true,
        data: role,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getAllRoles: async (req, res) => {
    try {
      const roles = await roleModel.findAll({
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: roles,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  createRole: async (req, res) => {
    const { name } = req.body;

    try {
      await roleModel.create({
        name: name,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'role created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  updateRole: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const updatedRole = await roleModel.update(
        { name: name },
        {
          where: { id: id },
        }
      );

      if (updatedRole === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `role having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'role updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  deleteRole: async (req, res) => {
    const { id } = req.params;

    try {
      const deleteRole = await roleModel.destroy({
        where: { id: id },
      });

      if (deleteRole === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `role having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'role deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default roleController;
