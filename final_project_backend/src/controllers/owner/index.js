import ownerModel from '../../models/owner/index.js';
import statusCodes from '../../shared/statusCodes.js';

const getOwners = async (req, res) => {
  try {
    const owners = await ownerModel.findAll({
      order: [['createdAt', 'asc']],
      attributes: ['id', 'name'],
    });

    res.status(statusCodes.OK).json({
      success: true,
      data: owners,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });
  }
};

export default getOwners;
