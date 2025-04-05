import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const noteValidator = {
  validateNote: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().max(20).required(),
      note: Joi.string().required(),
      attachements: Joi.array().items(Joi.string()).required(),
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
  validateComment: (req, res, next) => {
    const schema = Joi.object({
      comment: Joi.string().max(200).required(),
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

export default noteValidator;
