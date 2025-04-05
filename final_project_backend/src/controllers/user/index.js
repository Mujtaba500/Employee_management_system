import userModel from '../../models/user/index.js';
import statusCodes from '../../shared/statusCodes.js';
import roleModel from '../../models/role/index.js';
import designationModel from '../../models/designation/index.js';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import departmentModel from '../../models/department/index.js';

const userController = {
  getSingleUser: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const user = await userModel.findOne({
        // attributes: ['id', 'name', 'userImg'],
        // include: [
        //   {
        //     model: designationModel,
        //     attributes: ['name'],
        //   },
        //   {
        //     model: roleModel,
        //     attributes: ['name'],
        //     where: {
        //       name: 'employee',
        //     },
        //   },
        // ],
        where: {
          id: id,
        },
      });

      if (!user) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: 'user not found' });
      }

      res.status(statusCodes.OK).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getAllUser: async (req, res) => {
    try {
      if (req.query.role) {
        const role = req.query.role;

        const users = await userModel.findAll({
          include: [
            {
              model: designationModel,
              attributes: ['name'],
            },
            {
              model: departmentModel,
              attributes: ['name'],
            },
            {
              model: roleModel,
              attributes: ['name'],
              where: {
                name: role,
              },
            },
            {
              model: userModel,
              as: 'lineManager',
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt', 'password'],
          },
        });

        res.status(statusCodes.OK).json({
          success: true,
          data: users,
        });
      } else {
        const users = await userModel.findAll({
          include: [
            {
              model: designationModel,
              attributes: ['name'],
            },
            {
              model: departmentModel,
              attributes: ['name'],
            },
            {
              model: roleModel,
              attributes: ['name'],
            },
            {
              model: userModel,
              as: 'lineManager',
            },
          ],
          attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        });

        res.status(statusCodes.OK).json({
          success: true,
          data: users,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getAllEmployees: async (req, res) => {
    const { id } = req.user;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    try {
      const { count, rows } = await userModel.findAndCountAll({
        attributes: ['id', 'name', 'userImg'],
        where: {
          lineManagerId: id,
        },
        include: [
          {
            model: designationModel,
            attributes: ['name'],
          },
          {
            model: roleModel,
            attributes: ['name'],
          },
        ],
        limit: limit,
        offset: offset,
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: rows,
        totalRecords: count,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  getAllLineManagers: async (req, res) => {
    try {
      const users = await userModel.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: roleModel,
            attributes: ['name'],
            where: { name: 'line manager' },
          },
        ],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  searchEmployees: async (req, res) => {
    const { id } = req.user;
    try {
      const { search } = req.params;
      const users = await userModel.findAll({
        attributes: ['id', 'name', 'userImg'],
        where: {
          name: { [Op.like]: '%' + search + '%' },
          lineManagerId: id,
        },
        include: [
          {
            model: designationModel,
            attributes: ['name'],
          },
          {
            model: roleModel,
            attributes: ['name'],
            where: {
              name: 'employee',
            },
          },
        ],
      });

      res.status(statusCodes.OK).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    let hashPassword;
    const {
      name,
      email,
      password,
      userImg,
      contact,
      rating,
      dob,
      gender,
      passportNo,
      address,
      country,
      departmentId,
      designationId,
      roleId,
    } = req.body;

    try {
      if (password) {
        hashPassword = await bcrypt.hash(password, 10);
      }

      const updateduser = await userModel.update(
        {
          name: name,
          email: email,
          password: hashPassword,
          userImg: userImg,
          contact: contact,
          rating: rating,
          dob: dob,
          gender: gender,
          passportNo: passportNo,
          address: address,
          country: country,
          departmentId: departmentId,
          designationId: designationId,
          roleId: roleId,
        },
        {
          where: { id: id },
        }
      );

      if (updateduser === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `user having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'user updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const deleteUser = await userModel.destroy({
        where: { id: id },
      });

      if (deleteUser === 0) {
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: `user having id ${id} is not found` });
      }

      res.status(statusCodes.OK).json({
        success: true,
        message: 'user deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default userController;
