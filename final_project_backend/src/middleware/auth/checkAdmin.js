import userModel from '../../models/user/index.js';
import roleModel from '../../models/role/index.js';
import statusCodes from '../../shared/statusCodes.js';

const checkAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      where: {
        id: req.user.id,
      },
      include: [{ model: roleModel }],
    });

    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: 'Unauthorized , user does not exist',
      });
    }

    if (user.Role.name !== 'admin') {
      return res.status(statusCodes.NOT_FOUND).json({
        message: 'Unauthorized , you are not allowed to access this route',
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });
  }
};

export default checkAdmin;
