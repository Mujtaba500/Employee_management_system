import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const authValidator = {
  registerValidator: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(40).required().messages({
        'any.required': 'name is required',
        'string.empty': 'name cannot be empty',
        'string.max': 'name must not exceed {#limit} characters',
        'string.min': 'name must greater then {#limit} characters',
      }),
      email: Joi.string().email().min(3).max(40).required().messages({
        'any.required': 'email is required',
        'string.empty': 'email cannot be empty',
        'string.max': 'email must not exceed {#limit} characters',
        'string.min': 'email must greater then {#limit} characters',
      }),
      password: Joi.string().min(8).max(20).required().messages({
        'any.required': 'password is required',
        'string.empty': 'password cannot be empty',
        'string.max': 'password must not exceed {#limit} characters',
        'string.min': 'password must greater then {#limit} characters',
      }),
      userImg: Joi.string().messages({
        'string.empty': 'user Img cannot be empty',
      }),
      contact: Joi.string().min(8).max(20).required().messages({
        'any.required': 'contact is required',
        'string.empty': 'contact cannot be empty',
        'string.max': 'contact must not exceed {#limit} characters',
        'string.min': 'contact must greater then {#limit} characters',
      }),
      startTime: Joi.date().iso().required().messages({
        'any.required': 'start time is required',
      }),
      endTime: Joi.date().iso().required().messages({
        'any.required': 'end time is required',
      }),
      rating: Joi.number().valid(1, 2, 3, 4, 5).messages({
        'number.base': 'rating should be number',
        'any.only': 'rating can only be between 1,2,3,4,5',
      }),
      dob: Joi.date().iso().required().messages({
        'any.required': 'dob is required',
      }),
      gender: Joi.string()
        .required()
        .valid('male', 'female', 'other')
        .messages({
          'any.required': 'gender is required',
          'string.empty': 'gender cannot be empty',
          'any.only': 'gender can only be male, female and other',
        }),
      cnicNo: Joi.string().required().min(10).max(30).messages({
        'any.required': 'cnic number is required',
        'string.empty': 'cnic number cannot be empty',
        'string.max': 'cnic number must not exceed {#limit} characters',
        'string.min': 'cnic number must greater then {#limit} characters',
      }),
      address: Joi.string().min(5).max(255).messages({
        'string.empty': 'address is required',
        'string.max': 'address must not exceed {#limit} characters',
        'string.min': 'address must greater then {#limit} characters',
      }),
      country: Joi.string().min(3).max(255).messages({
        'string.empty': 'country is required',
        'string.max': 'country must not exceed {#limit} characters',
        'string.min': 'country must greater then {#limit} characters',
      }),
      departmentId: Joi.number().required().messages({
        'any.required': 'department Id is required',
        'number.base': 'department Id is required',
      }),
      designationId: Joi.number().required().messages({
        'any.required': 'designation Id is required',
        'number.base': 'designation Id is required',
      }),
      roleId: Joi.number().required().messages({
        'any.required': 'role id is required',
        'number.base': 'role id is required',
      }),
      lineManagerId: Joi.number().messages({
        'number.base': 'line manager id cannot be empty',
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

  loginValidator: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().min(3).max(40).required().messages({
        'any.required': 'email is required',
        'string.empty': 'email is required',
        'string.max': 'email must not exceed {#limit} characters',
        'string.min': 'email must greater then {#limit} characters',
      }),
      password: Joi.string().min(8).max(20).required().messages({
        'any.required': 'password is required',
        'string.empty': 'password is required',
        'string.max': 'password must not exceed {#limit} characters',
        'string.min': 'password must greater then {#limit} characters',
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

export default authValidator;
