import statusCodes from '../../shared/statusCodes.js';
import contactModel from '../../models/contact/index.js';
import companyModel from '../../models/company/index.js';
import ownerModel from '../../models/owner/index.js';
import industryModel from '../../models/industry/index.js';
import currencyModel from '../../models/currency/index.js';
import tagModel from '../../models/tag/index.js';
import sourceModel from '../../models/source/index.js';
import { sequelize } from '../../db/config.js';
import reviewModel from '../../models/review/index.js';
import languageModel from '../../models/language/index.js';
import countryModel from '../../models/country/index.js';
import contactStatusModel from '../../models/contactStatus/index.js';
import userModel from '../../models/user/index.js';
import { Op, where } from 'sequelize';
import phoneNumberModel from '../../models/phoneNumber/index.js';
import socialProfileDetailsModel from '../../models/socialProfile/socialProfileDetails/index.js';

const contactController = {
  createContact: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const body = req.body;

      let data = {
        ...body,
        viewedAt: new Date(),
        created_by: req.user.id,
        contactStatusId: body.statusId,
      };

      const company = await companyModel.findByPk(data.companyId);

      if (!company) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Company does not exist',
        });
      }

      const owner = await ownerModel.findByPk(data.ownerId);

      if (!owner) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Owner does not exist',
        });
      }

      const industry = await industryModel.findByPk(data.industryId);

      if (!industry) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Industry does not exist',
        });
      }

      const currency = await currencyModel.findByPk(data.currencyId);

      if (!currency) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Currency does not exist',
        });
      }

      const review = await reviewModel.findByPk(data.reviewId);

      if (!review) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Review does not exist',
        });
      }

      const language = await languageModel.findByPk(data.languageId);

      if (!language) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Language does not exist',
        });
      }

      const country = await countryModel.findByPk(data.countryId);

      if (!country) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Country does not exist',
        });
      }

      const status = await contactStatusModel.findByPk(data.statusId);

      if (!status) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: `Status with id ${data.statusId} does not exist`,
        });
      }

      const source = await sourceModel.findByPk(data.sourceId);

      if (!source) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Source does not exist',
        });
      }

      const tags = [];
      for (const tagId of data.tagIds) {
        const tag = await tagModel.findByPk(tagId);

        if (!tag) {
          return res.status(statusCodes.NOT_FOUND).json({
            success: false,
            message: `Tag with id ${tagId} does not exist`,
          });
        }
        tags.push(tag);
      }

      const selectUsers = [];
      if (data.visibility === 'Select' && data.selectedUsers) {
        for (const userId of data.selectedUsers) {
          const user = await userModel.findByPk(userId);

          if (!user) {
            return res.status(statusCodes.NOT_FOUND).json({
              success: false,
              message: `Selected User for contact visibility with id ${userId} does not exist`,
            });
          }

          selectUsers.push(user);
        }
      }

      if (data.visibility === 'Private') {
        data = { ...data, private_to: req.user.id };
      }

      const contact = await contactModel.create(data, { transaction: t });

      // Add phone Nos
      await phoneNumberModel.create(
        {
          number: data.phoneNo1,
          isMain: true,
          contactId: contact.id,
        },
        { transaction: t }
      );
      await phoneNumberModel.create(
        {
          number: data.phoneNo2,
          isMain: false,
          contactId: contact.id,
        },
        { transaction: t }
      );

      if (data.socialProfiles?.length > 0) {
        data.socialProfiles.forEach(async (profile) => {
          await socialProfileDetailsModel.create(
            {
              contactId: contact.id,
              socialProfileTypeId: profile.profileTypeId,
              URL: profile.profileURL,
            },
            { transaction: t }
          );
        });
      }

      //Create Tags
      await contact.addTag(tags, { transaction: t });

      if (selectUsers.length > 0) {
        await contact.addUsers_contacts(selectUsers, { transaction: t });
      }

      await t.commit();

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Contact created successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
      await t.rollback();
    }
  },
  getAllContacts: async (req, res) => {
    try {
      // firstName, lastName, jobTitle, profileImg, phoneNo1, email, TAGS, LOCATION, RATING, OWNER, STATUS
      const userId = req.user.id;

      // contacts visible to the selected user
      // let visibleToUserContacts = await user.getUsers_contacts({
      //   where: {
      //     created_by: { [Op.ne]: userId },
      //   },
      //   include: [
      //     { model: tagModel, attributes: ['id', 'name'] },
      //     { model: ownerModel, attributes: ['id', 'name'] },
      //     {
      //       model: phoneNumberModel,
      //       where: {
      //         isMain: true,
      //       },
      //       attributes: ['id', 'number'],
      //     },
      //     { model: contactStatusModel, attributes: ['id', 'name'] },
      //     { model: countryModel, attributes: ['id', 'name'] },
      //     {
      //       model: socialProfileDetailsModel,
      //       attributes: ['id', 'URL', 'socialProfileTypeId'],
      //     },
      //   ],
      //   order: [['createdAt', 'asc']],
      //   attributes: [
      //     'id',
      //     'firstName',
      //     'lastName',
      //     'jobTitle',
      //     'profileImg',
      //     // 'phoneNo1',
      //     'email',
      //     // 'location',
      //     'rating',
      //     // 'status',
      //     'viewedAt',
      //     'createdAt',
      //     'created_by',
      //   ],
      // });

      let contacts = await contactModel.findAll({
        where: {
          [Op.or]: [
            { created_by: userId },
            { visibility: 'Public' },
            { visibility: 'Private', private_to: userId },
            { visibility: 'Select', '$users_contacts.id$': userId },
          ],
        },
        include: [
          { model: tagModel, attributes: ['id', 'name'] },
          { model: ownerModel, attributes: ['id', 'name'] },
          {
            model: phoneNumberModel,
            where: {
              isMain: true,
            },
            attributes: ['id', 'number'],
          },
          { model: contactStatusModel, attributes: ['id', 'name'] },
          { model: countryModel, attributes: ['id', 'name'] },
          {
            model: socialProfileDetailsModel,
            attributes: ['id', 'URL', 'socialProfileTypeId'],
          },
          {
            model: userModel,
            as: 'users_contacts',
            required: false,
          },
        ],
        order: [['createdAt', 'asc']],
        attributes: [
          'id',
          'firstName',
          'lastName',
          'jobTitle',
          'profileImg',
          // 'phoneNo1',
          'email',
          // 'location',
          'rating',
          // 'status',
          'viewedAt',
          'createdAt',
          'created_by',
        ],
      });
      // contacts = [...contacts, ...visibleToUserContacts];
      // contacts = contacts.sort((a, b) => {
      //   return new Date(a.createdAt) - new Date(b.createdAt);
      // });

      res.status(statusCodes.OK).json({
        success: true,
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  getSingleContact: async (req, res) => {
    try {
      const contactId = req.params.id;
      const userId = req.user.id;

      const contact = await contactModel.findOne({
        where: {
          id: contactId,
          [Op.or]: [
            { created_by: userId },
            { visibility: 'Public' },
            { visibility: 'Private', private_to: userId },
            { visibility: 'Select', '$users_contacts.id$': userId },
          ],
        },
        attributes: {
          exclude: [
            'ownerId',
            'companyId',
            'industryId',
            'currencyId',
            'sourceId',
            'reviewId',
            'languageId',
            'countryId',
            'contactStatusId',
          ],
        },
        include: [
          { model: tagModel, attributes: ['id', 'name'] },
          { model: ownerModel, attributes: ['id', 'name'] },
          { model: companyModel, attributes: ['id', 'name'] },
          { model: ownerModel, attributes: ['id', 'name'] },
          { model: industryModel, attributes: ['id', 'name'] },
          { model: currencyModel, attributes: ['id', 'currency'] },
          { model: sourceModel, attributes: ['id', 'name'] },
          { model: contactStatusModel, attributes: ['id', 'name'] },
          { model: countryModel, attributes: ['id', 'name'] },
          { model: reviewModel, attributes: ['id', 'name'] },
          { model: languageModel, attributes: ['id', 'name'] },
          {
            model: socialProfileDetailsModel,
            attributes: ['id', 'URL', 'socialProfileTypeId'],
          },
          { model: phoneNumberModel, attributes: ['id', 'number', 'isMain'] },
          {
            model: userModel,
            as: 'users_contacts',
            attributes: ['id', 'name'],
            required: false,
          },
        ],
      });

      if (!contact) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message:
            'Contact not found or you are not authorized to access this contact',
        });
      }

      // if (contact.created_by !== userId || contact)
      res.status(statusCodes.OK).json({
        success: true,
        data: contact,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
  updateContact: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const contactId = req.params.id;
      let data = { ...req.body, contactStatusId: req.body.statusId };
      const userId = req.user.id;

      const contact = await contactModel.findOne({
        where: {
          id: contactId,
          [Op.or]: [
            { created_by: userId },
            { visibility: 'Public' },
            { visibility: 'Private', private_to: userId },
            { visibility: 'Select', '$users_contacts.id$': userId },
          ],
        },
        include: [
          {
            model: socialProfileDetailsModel,
            attributes: ['id', 'URL', 'socialProfileTypeId'],
          },
          { model: phoneNumberModel, attributes: ['id', 'number', 'isMain'] },
          {
            model: userModel,
            as: 'users_contacts',
            required: false,
          },
        ],
      });

      if (!contact) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Contact does not exist',
        });
      }

      const [
        company,
        owner,
        industry,
        currency,
        review,
        source,
        language,
        country,
        status,
      ] = await Promise.all([
        companyModel.findByPk(data.companyId),
        ownerModel.findByPk(data.ownerId),
        industryModel.findByPk(data.industryId),
        currencyModel.findByPk(data.currencyId),
        reviewModel.findByPk(data.reviewId),
        sourceModel.findByPk(data.sourceId),
        languageModel.findByPk(data.languageId),
        countryModel.findByPk(data.countryId),
        contactStatusModel.findByPk(data.statusId),
      ]);

      // const company = await companyModel.findByPk(data.companyId);

      if (!company) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Company does not exist',
        });
      }

      // const owner = await ownerModel.findByPk(data.ownerId);

      if (!owner) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Owner does not exist',
        });
      }

      // const industry = await industryModel.findByPk(data.industryId);

      if (!industry) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Industry does not exist',
        });
      }

      // const currency = await currencyModel.findByPk(data.currencyId);

      if (!currency) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Currency does not exist',
        });
      }

      // const source = await sourceModel.findByPk(data.sourceId);

      if (!source) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Source does not exist',
        });
      }

      // const review = await reviewModel.findByPk(data.reviewId);

      if (!review) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Review does not exist',
        });
      }

      // const language = await languageModel.findByPk(data.languageId);

      if (!language) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Language does not exist',
        });
      }

      // const country = await countryModel.findByPk(data.countryId);

      if (!country) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: 'Country does not exist',
        });
      }

      // const status = await contactStatusModel.findByPk(data.statusId);

      if (!status) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: `Status with id ${data.statusId} does not exist`,
        });
      }

      const tags = [];
      for (const tagId of data.tagIds) {
        const tag = await tagModel.findByPk(tagId);

        if (!tag) {
          return res.status(statusCodes.NOT_FOUND).json({
            success: false,
            message: `Tag with id ${tagId} does not exist`,
          });
        }
        tags.push(tag);
      }

      const selectUsers = [];
      if (data.visibility === 'Select' && data.selectedUsers) {
        for (const userId of data.selectedUsers) {
          const user = await userModel.findByPk(userId);

          if (!user) {
            return res.status(statusCodes.NOT_FOUND).json({
              success: false,
              message: `Selected User for contact visibility with id ${userId} does not exist`,
            });
          }

          selectUsers.push(user);
        }
      }

      if (data.visibility === 'Private') {
        data = { ...data, private_to: userId };
      }

      await contact.update(data, { transaction: t });
      await contact.addTag(tags, { transaction: t });

      for (const number of contact.phoneNumbers) {
        if (number.isMain && number.number !== data.phoneNo1.number) {
          const phoneNumber = await phoneNumberModel.findByPk(data.phoneNo1.id);
          console.log('ghsjhghjdsgiljsil');
          if (!phoneNumber) {
            return res.status(statusCodes.NOT_FOUND).json({
              success: false,
              message: `Main Phone Number with id ${data.phoneNo1.id} does not exist`,
            });
          }

          await phoneNumber.update(
            {
              number: data.phoneNo1.number,
            },
            {
              transaction: t,
            }
          );
        } else if (!number.isMain && number.number !== data.phoneNo2.number) {
          const phoneNumber = await phoneNumberModel.findByPk(data.phoneNo1.id);

          if (!phoneNumber) {
            return res.status(statusCodes.NOT_FOUND).json({
              success: false,
              message: `Phone Number with id ${data.phoneNo2.id} does not exist`,
            });
          }

          await phoneNumber.update(
            {
              number: data.phoneNo2.number,
            },
            {
              transaction: t,
            }
          );
        }
      }

      if (data.socialProfiles?.length > 0) {
        for (const profile of data.socialProfiles) {
          const contactProfile = contact.socialProfileDetails.find(
            (sProfile) => {
              return sProfile.id === profile.id;
            }
          );
          if (contactProfile.URL !== profile.profileURL) {
            const socialProfile = await socialProfileDetailsModel.findByPk(
              profile.id
            );

            if (!socialProfile) {
              return res.status(statusCodes.NOT_FOUND).json({
                success: false,
                message: `Social Profile with id ${profile.id} does not exist`,
              });
            }

            await socialProfile.update(
              {
                URL: profile.profileURL,
              },
              { transaction: t }
            );
          }
        }
      }

      if (selectUsers.length > 0) {
        await contact.setUsers_contacts(selectUsers, { transaction: t });
      }

      await t.commit();

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Contact updated successfully!',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
      await t.rollback();
    }
  },
  viewContact: async (req, res) => {
    try {
      const contactId = req.params.id;
      const userId = req.user.id;
      // const contact = await contactModel.findByPk(contactId);

      const contact = await contactModel.findOne({
        where: {
          id: contactId,
          [Op.or]: [
            { created_by: userId },
            { visibility: 'Public' },
            { visibility: 'Private', private_to: userId },
            { visibility: 'Select', '$users_contacts.id$': userId },
          ],
        },
        attributes: ['id', 'visibility', 'created_by'],
        include: [
          {
            model: userModel,
            as: 'users_contacts',
            required: false,
            attributes: ['id'],
          },
        ],
      });

      if (!contact) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message:
            'Contact not found or you are not authorized to access this contact',
        });
      }

      await contact.update({
        viewedAt: Date.now(),
      });

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Contact view updated successfully!',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },

  deleteContact: async (req, res) => {
    try {
      const contactId = req.params.id;
      const userId = req.user.id;

      const contact = await contactModel.findOne({
        where: {
          id: contactId,
          [Op.or]: [
            { created_by: userId },
            { visibility: 'Public' },
            { visibility: 'Private', private_to: userId },
            { visibility: 'Select', '$users_contacts.id$': userId },
          ],
        },
        attributes: ['id', 'visibility', 'created_by'],
        include: [
          {
            model: userModel,
            as: 'users_contacts',
            required: false,
            attributes: ['id'],
          },
        ],
      });

      if (!contact) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message:
            'Contact does not exist or you are not authorized to delete this contact',
        });
      }

      await contact.destroy();

      res.status(statusCodes.OK).json({
        success: true,
        message: 'Contact deleted successfully!',
      });
    } catch (error) {
      console.error(error);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      });
    }
  },
};

export default contactController;
