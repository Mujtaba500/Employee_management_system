import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const workFromHomeValidator = {
  createValidator: (req, res, next) => {
    const schema = Joi.object({
      // date: Joi.date().iso().required().messages({
      //   'any.required': 'Date is required',
      //   'date.base': 'Invalid date format',
      // }),
      startDate: Joi.date().iso().required().messages({
        'any.required': 'Start date is required',
        'date.base': 'Invalid start date format',
      }),
      endDate: Joi.date()
        .iso()
        .greater(Joi.ref('startDate'))
        .required()
        .messages({
          'any.required': 'End date is required',
          'date.base': 'Invalid end date format',
          'date.greater': 'To date must be after from date',
        }),
      reason: Joi.string().min(5).max(1000).required().messages({
        'any.required': 'Reason is required',
        'string.min': 'Reason must be at least 5 characters long',
        'string.max': 'Reason cannot exceed 1000 characters',
        'string.base': 'Reason must be a valid text',
      }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: error.details.map((err) => err.message).join(', '),
      });
    }
    next();
  },
  updateValidator: (req, res, next) => {
    const schema = Joi.object({
      status: Joi.string()
        .valid('Decline', 'Pending', 'Approved')
        .required()
        .messages({
          'any.required': 'status is required',
          'string.base': 'status should be string',
          'any.only': 'status can only be Decline, Pending, Approved',
        }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: error.details.map((err) => err.message).join(', '),
      });
    }
    next();
  },
};

export default workFromHomeValidator;
