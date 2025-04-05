import userModel from '../../models/user/index.js';
import departmentModel from '../../models/department/index.js';
import designationModel from '../../models/designation/index.js';
import roleModel from '../../models/role/index.js';
import statusCodes from '../../shared/statusCodes.js';
import bcrypt from 'bcrypt';
import generateAccessToken from '../../shared/jwt/index.js';
import client from '../../shared/redis/index.js';

const authController = {
  register: async (req, res) => {
    const {
      name,
      email,
      password,
      userImg,
      contact,
      rating,
      dob,
      gender,
      cnicNo,
      address,
      country,
      departmentId,
      designationId,
      roleId,
      lineManagerId,
      startTime,
      endTime,
    } = req.body;

    const start = new Date(startTime);
    const end = new Date(endTime);

    // Calculate the difference. the difference comes in miliseconds so we have to convert to hours

    let differenceInMs;

    if (end > start) {
      differenceInMs = end - start;
    } else {
      differenceInMs = start - end;
    }

    // Convert milliseconds to hours
    const servingHours = differenceInMs / (1000 * 60 * 60); // Convert ms to hours

    try {
      const hashPassword = await bcrypt.hash(password, 10);

      await userModel.create({
        name: name,
        email: email,
        password: hashPassword,
        userImg: userImg,
        contact: contact,
        rating: rating,
        dob: dob,
        gender: gender,
        cnicNo: cnicNo,
        address: address,
        country: country,
        departmentId: departmentId,
        designationId: designationId,
        roleId: roleId,
        lineManagerId: lineManagerId,
        startTime: startTime.slice(11, 19),
        endTime: endTime.slice(11, 19),
        servingHours: servingHours,
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'user register successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.errors[0].message,
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const loginUser = await userModel.findOne({
        where: {
          email: email,
        },
        include: [
          { model: departmentModel, attributes: ['name'] },
          { model: designationModel, attributes: ['name'] },
          { model: roleModel, attributes: ['name'] },
        ],
      });

      if (!loginUser) {
        return res.status(statusCodes.NOT_FOUND).json({
          message: 'Invalid email',
        });
      }

      const isMatch = await bcrypt.compare(password, loginUser.password);

      if (!isMatch) {
        return res.status(statusCodes.NOT_FOUND).json({
          message: 'Invalid password',
        });
      }

      const userObject = {
        id: loginUser?.id,
        name: loginUser?.name,
        email: loginUser?.email,
        gender: loginUser?.gender,
        userImg: loginUser?.userImg,
        contact: loginUser?.contact,
        lineManagerId: loginUser?.lineManagerId,
        role: loginUser?.Role?.name,
        starTime: loginUser?.startTime,
        endTime: loginUser?.endTime,
        department: loginUser?.department?.name,
        designation: loginUser?.designation?.name,
      };

      const token = generateAccessToken(userObject);
      res.status(statusCodes.OK).json({
        success: true,
        token: token,
        data: userObject,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      // time sets in seconds. 300s = 5m
      const set = await client.setex(token, '300', 'blackList');

      if (set !== 'OK') {
        return res
          .status(statusCodes.BAD_REQUEST)
          .json({ success: false, message: 'enable to logout' });
      }
      res.status(statusCodes.OK).json({
        success: true,
        message: 'user logout',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  },
};

export default authController;
