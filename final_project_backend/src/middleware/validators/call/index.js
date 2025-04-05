import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const validateCallCreation = (req, res, next) => {
  const schema = Joi.object({
    followUpDate: Joi.date().required(),
    statusId: Joi.string().required(),
    note: Joi.string().max(200).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
  next();
};

export default validateCallCreation;
