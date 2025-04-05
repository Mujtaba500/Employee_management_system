import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const statusValidator = {
  validator: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().max(20).required().messages({
        'any.required': 'status name is required',
        'string.empty': 'status name is required',
        'string.max': 'status name must not exceed {#limit} characters',
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

export default statusValidator;
