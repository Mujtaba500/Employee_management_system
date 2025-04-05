import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const leaveTypeValidator = {
  validator: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().max(20).required().messages({
        'any.required': 'leave type name is required',
        'string.empty': 'leave type name is required',
        'string.max': 'leave type must not exceed {#limit} characters',
      }),
      allowed: Joi.number().required().messages({
        'any.required': 'allowed leaves is required',
        'number.base': 'allowed leaves must be a number',
      }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
    next();
  },
};

export default leaveTypeValidator;
