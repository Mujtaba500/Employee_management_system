import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const roleValidator = {
  validator: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().max(20).required().messages({
        'any.required': 'role name is required',
        'string.empty': 'role name is required',
        'string.max': 'role name must not exceed {#limit} characters',
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

export default roleValidator;
