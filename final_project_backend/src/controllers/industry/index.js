import industryModel from '../../models/industry/index.js';
import statusCodes from '../../shared/statusCodes.js';

const getindustries = async (req, res) => {
  try {
    const industrys = await industryModel.findAll({
      order: [['createdAt', 'asc']],
      attributes: ['id', 'name'],
    });

    res.status(statusCodes.OK).json({
      success: true,
      data: industrys,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });
  }
};

export default getindustries;
