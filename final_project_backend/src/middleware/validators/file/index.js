import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';
import documentTypeModel from '../../../models/documentType/index.js';

const validatefileCreation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    isSigned: Joi.boolean().required(),
    dealId: Joi.string().required(),
    documentTypeId: Joi.string().required(),
    ownerId: Joi.string().required(),
    localeId: Joi.string().required(),
    signer_name: Joi.when('isSigned', {
      is: true,
      then: Joi.string().required(),
    }),
    signer_email: Joi.when('isSigned', {
      is: true,
      then: Joi.string().email().required(),
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

export default validatefileCreation;
