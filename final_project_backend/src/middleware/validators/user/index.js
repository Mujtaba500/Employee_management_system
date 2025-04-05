import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const userValidator = {
  updateValidator: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(40).messages({
        'string.empty': 'name is required',
        'string.max': 'name must not exceed {#limit} characters',
        'string.min': 'name must greater then {#limit} characters',
      }),
      email: Joi.string().email().min(3).max(40).messages({
        'string.empty': 'email is required',
        'string.max': 'email must not exceed {#limit} characters',
        'string.min': 'email must greater then {#limit} characters',
        'email.base': 'email must be in correct formate',
      }),
      password: Joi.string().min(8).max(20).messages({
        'string.empty': 'password is required',
        'string.max': 'password must not exceed {#limit} characters',
        'string.min': 'password must greater then {#limit} characters',
      }),
      userImg: Joi.string().messages({
        'string.empty': 'user Img is required',
      }),
      contact: Joi.string().min(8).max(20).messages({
        'string.empty': 'contact is required',
        'string.max': 'contact must not exceed {#limit} characters',
        'string.min': 'contact must greater then {#limit} characters',
      }),
      rating: Joi.number().valid(1, 2, 3, 4, 5).messages({
        'number.base': 'rating is required',
        'valid.base': 'rating can only be 1 to 5',
      }),
      dob: Joi.date().iso().messages({
        'date.base': 'Invalid date format',
      }),
      gender: Joi.string().valid('male', 'female', 'other').messages({
        'string.empty': 'gender is required',
        'valid.base': 'gender can only be male, female and other',
      }),
      passportNo: Joi.string().min(10).max(30).messages({
        'string.empty': 'passportNo is required',
        'string.max': 'passportNo must not exceed {#limit} characters',
        'string.min': 'passportNo must greater then {#limit} characters',
      }),
      address: Joi.string().min(5).max(255).messages({
        'string.empty': 'address is required',
        'string.max': 'address must not exceed {#limit} characters',
        'string.min': 'address must greater then {#limit} characters',
      }),
      country: Joi.string().min(3).max(25).messages({
        'string.empty': 'country is required',
        'string.max': 'country must not exceed {#limit} characters',
        'string.min': 'country must greater then {#limit} characters',
      }),
      departmentId: Joi.number().messages({
        'number.base': 'department Id is required',
      }),
      designationId: Joi.number().messages({
        'number.base': 'designation Id is required',
      }),
      roleId: Joi.number().messages({
        'number.base': 'role id is required',
      }),
      lineManagerId: Joi.number().messages({
        'number.base': 'line manager id is required',
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

export default userValidator;
