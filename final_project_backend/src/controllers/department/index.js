import departmentModel from '../../models/department/index.js';
import statusCodes from '../../shared/statusCodes.js';

const departmentController = {
  createDepartment: async (req, res) => {
    const { name } = req.body;

    try {
      await departmentModel.create({
        name: name,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Department created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error',
      });
    }
  },
  getDepartments: async (req, res) => {
    try {
      const departments = await departmentModel.findAll({
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: departments,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error',
      });
    }
  },
  updateDepartment: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;

      const department = await departmentModel.findByPk(id);

      if (!department) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Department not found',
        });
      }

      await department.update({
        name: name,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Department updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  deleteDepartment: async (req, res) => {
    try {
      const id = req.params.id;

      const department = await departmentModel.findByPk(id);

      if (!department) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Department not found',
        });
      }

      await department.destroy();

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Department deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default departmentController;
