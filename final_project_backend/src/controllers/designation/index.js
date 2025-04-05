import departmentModel from '../../models/department/index.js';
import designationModel from '../../models/designation/index.js';
import statusCodes from '../../shared/statusCodes.js';

const designationController = {
  createdesignation: async (req, res) => {
    const { name } = req.body;
    const id = req.params.deptId;

    try {
      const department = await departmentModel.findByPk(id);

      if (!department) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Department not found',
        });
      }

      await designationModel.create({
        name: name,
        departmentId: id,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Designation created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getdesignations: async (req, res) => {
    try {
      const designations = await designationModel.findAll({
        include: [{ model: departmentModel, attributes: ['id', 'name'] }],
        order: [['createdAt', 'asc']],
        attributes: ['id', 'name'],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: designations,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  updatedesignation: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, departmentId } = req.body;

      const designation = await designationModel.findByPk(id);

      if (!designation) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Designation not found',
        });
      }

      await designation.update({
        name: name,
        departmentId,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Designation updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  deletedesignation: async (req, res) => {
    try {
      const id = req.params.id;

      const designation = await designationModel.findByPk(id);

      if (!designation) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Designation not found',
        });
      }

      await designation.destroy();

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Designation deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default designationController;
