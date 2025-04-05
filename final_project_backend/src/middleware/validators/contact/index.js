import Joi from 'joi';
import statusCodes from '../../../shared/statusCodes.js';

const contactValidator = {
  validateContactCreation: (req, res, next) => {
    const schema = Joi.object({
      firstName: Joi.string().trim().max(50).required(),
      lastName: Joi.string().trim().max(50).required(),
      profileImg: Joi.string().required(),
      jobTitle: Joi.string().trim().max(50).required(),
      email: Joi.string().trim().email().required(),
      phoneNo1: Joi.string().trim().max(14).required(),
      phoneNo2: Joi.string().trim().max(14).required(),
      fax: Joi.string().trim().max(50),
      dob: Joi.date().required(),
      reviewId: Joi.string().required(),
      languageId: Joi.string().required(),
      comments: Joi.string().max(500).required(),
      rating: Joi.valid('1', '2', '3', '4', '5').required(),
      streetAddress: Joi.string().trim().max(50).required(),
      city: Joi.string().trim().max(50).required(),
      province: Joi.string().trim().max(50).required(),
      zipCode: Joi.number().required(),
      socialProfiles: Joi.array().items(
        Joi.object().keys({
          profileTypeId: Joi.string().required(),
          profileURL: Joi.string().required(),
        })
      ),
      visibility: Joi.valid('Public', 'Private', 'Select').required(),
      selectedUsers: Joi.array().items(Joi.string()),
      countryId: Joi.string().required(),
      statusId: Joi.string().required(),
      companyId: Joi.string().required(),
      ownerId: Joi.string().required(),
      industryId: Joi.string().required(),
      currencyId: Joi.string().required(),
      sourceId: Joi.string().required(),
      tagIds: Joi.array().items(Joi.string()).required(),
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
  validateContactUpdation: (req, res, next) => {
    const schema = Joi.object({
      firstName: Joi.string().trim().min(1).max(50).required(),
      lastName: Joi.string().trim().max(50).required(),
      profileImg: Joi.string().required(),
      jobTitle: Joi.string().trim().max(50).required(),
      email: Joi.string().trim().email().required(),
      phoneNo1: Joi.object()
        .keys({
          id: Joi.string().required(),
          number: Joi.string().required(),
        })
        .required(),
      phoneNo2: Joi.object()
        .keys({
          id: Joi.string().required(),
          number: Joi.string().required(),
        })
        .required(),
      fax: Joi.string().trim().max(50),
      dob: Joi.date().required(),
      reviewId: Joi.string().required(),
      languageId: Joi.string().required(),
      comments: Joi.string().max(500).required(),
      rating: Joi.valid('1', '2', '3', '4', '5').required(),
      streetAddress: Joi.string().trim().max(50).required(),
      city: Joi.string().trim().max(50).required(),
      province: Joi.string().trim().max(50).required(),
      zipCode: Joi.number().required(),
      socialProfiles: Joi.array().items(
        Joi.object().keys({
          id: Joi.string().required(),
          profileURL: Joi.string().required(),
        })
      ),
      visibility: Joi.valid('Public', 'Private', 'Select').required(),
      selectedUsers: Joi.array().items(Joi.string()),
      countryId: Joi.string().required(),
      statusId: Joi.string().required(),
      companyId: Joi.string().required(),
      ownerId: Joi.string().required(),
      industryId: Joi.string().required(),
      currencyId: Joi.string().required(),
      sourceId: Joi.string().required(),
      tagIds: Joi.array().items(Joi.string()).required(),
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

export default contactValidator;
