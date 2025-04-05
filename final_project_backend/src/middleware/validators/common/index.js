import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const validateInput = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required().messages({
      'any.required': 'Name is required',
      'string.empty': 'Name is required',
      'string.max': 'Name must not exceed {#limit} characters',
    }),
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

export default validateInput;
