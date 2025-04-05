import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const attendanceValidator = {
  createAttendanceValidator: (req, res, next) => {
    const schema = Joi.object({
      checkin: Joi.date().iso().required().messages({
        'any.required': 'Check-in time is required',
        'date.base': 'Invalid Check-in format',
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

  updateAttendanceCheckOutValidator: (req, res, next) => {
    const schema = Joi.object({
      checkout: Joi.date().iso().messages({
        'date.base': 'Invalid Check-out format',
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

  updateAttendanceBreaksValidator: (req, res, next) => {
    const schema = Joi.object({
      breakIn: Joi.date().iso().messages({
        'date.base': 'Invalid break in format',
      }),
      breakOut: Joi.date().iso().messages({
        'date.base': 'Invalid break out format',
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

export default attendanceValidator;
