import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const leaveValidator = {
  createLeaveValidator: (req, res, next) => {
    const schema = Joi.object({
      fromDate: Joi.date().iso().required().messages({
        'any.required': 'From date is required',
        'date.base': 'Invalid date format for from field',
      }),
      toDate: Joi.date()
        .iso()
        .greater(Joi.ref('fromDate'))
        .required()
        .messages({
          'any.required': 'To date is required',
          'date.base': 'Invalid date format for to field',
          'date.greater': 'To date must be greater than From date',
        }),
      reason: Joi.string().min(5).max(1000).required().messages({
        'any.required': 'Reason is required',
        'string.base': 'Reason must be a string',
        'string.min': 'Reason must be at least 5 characters long',
        'string.max': 'Reason must not exceed 1000 characters',
      }),
      leaveTypeId: Joi.number().required().messages({
        'any.required': 'levae type Id is required',
        'number.base': 'levae type  Id is required',
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
  updateLeaveValidator: (req, res, next) => {
    const schema = Joi.object({
      status: Joi.string()
        .valid('Decline', 'Pending', 'Approved')
        .required()
        .messages({
          'any.required': 'status is required',
          'string.base': 'status should be string',
          'any.only': 'status can only be Decline, Pending, Approved',
        }),
      fromDate: Joi.date().iso().messages({
        'date.base': 'Invalid date format for from field',
      }),
      toDate: Joi.date().iso().greater(Joi.ref('fromDate')).messages({
        'any.required': 'To date is required',
        'date.base': 'Invalid date format for to field',
        'date.greater': 'To date must be after from date',
      }),
      reason: Joi.string().min(5).max(1000).messages({
        'string.base': 'Reason must be a string',
        'string.min': 'Reason must be at least 5 characters long',
        'string.max': 'Reason must not exceed 1000 characters',
      }),
      leaveTypeId: Joi.number().messages({
        'number.base': 'levae type  Id is required',
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

export default leaveValidator;
