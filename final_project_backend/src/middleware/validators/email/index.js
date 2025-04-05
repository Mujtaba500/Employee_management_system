import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';
import documentTypeModel from '../../../models/documentType/index.js';

const validateEmailCreation = (req, res, next) => {
  const schema = Joi.object({
    subject: Joi.string().required(),
    content: Joi.string().required(),
    contactId: Joi.string().required(),
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

export default validateEmailCreation;
