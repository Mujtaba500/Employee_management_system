import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const dealValidator = {
  validateInput: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().max(50).required(),
      value: Joi.number().positive().required(),
      period: Joi.string().required(),
      periodValue: Joi.number().positive().required(),
      dueDate: Joi.date().required().min(Joi.ref('expectedClosingDate')),
      expectedClosingDate: Joi.date().required(),
      followupDate: Joi.date().required(),
      priority: Joi.valid('low', 'medium', 'high').required(),
      // status: Joi.valid(
      //   'Paused',
      //   'Stopped',
      //   'In Progress',
      //   'Closed',
      //   'Completed'
      // ).required(),
      description: Joi.string().required(),
      pipeLineId: Joi.string().required(),
      currencyId: Joi.string().required(),
      sourceId: Joi.string().required(),
      statusId: Joi.string().required(),
      userIds: Joi.array().items(Joi.number().required()).required(),
      contactIds: Joi.array().items(Joi.string().required()).required(),
      projectIds: Joi.array().items(Joi.string().required()).required(),
      tagIds: Joi.array().items(Joi.string().required()).required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(statusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
    next();
  },
};

export default dealValidator;
