import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

import companyModel from '../company/index.js';
import ownerModel from '../owner/index.js';
import industryModel from '../industry/index.js';
import currencyModel from '../currency/index.js';
import tagModel from '../tag/index.js';
import sourceModel from '../source/index.js';
import languageModel from '../language/index.js';
import reviewModel from '../review/index.js';
import contactStatusModel from '../contactStatus/index.js';
import countryModel from '../country/index.js';
import phoneNumberModel from '../phoneNumber/index.js';
import userModel from '../user/index.js';

const contactModel = sequelize.define(
  'contact',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // phoneNo1: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // phoneNo2: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    fax: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    // review: {
    //   type: DataTypes.ENUM,
    //   values: ['Poor', 'Bad', 'Good', 'Excellent'],
    // },
    // language: {
    //   type: DataTypes.ENUM,
    //   values: ['English', 'Urdu', 'Chinese', 'Russian', 'German'],
    //   allowNull: false,
    // },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // location: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    rating: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5'],
      allowNull: true,
    },
    viewedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    visibility: {
      type: DataTypes.ENUM,
      values: ['Public', 'Private', 'Select'],
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
    paranoid: true,
  }
);

companyModel.hasMany(contactModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
contactModel.belongsTo(companyModel);

countryModel.hasMany(contactModel);
contactModel.belongsTo(countryModel);

ownerModel.hasMany(contactModel);
contactModel.belongsTo(ownerModel);

industryModel.hasMany(contactModel);
contactModel.belongsTo(industryModel);

currencyModel.hasMany(contactModel);
contactModel.belongsTo(currencyModel);

contactModel.belongsToMany(tagModel, {
  through: 'contact_tags',
});
tagModel.belongsToMany(contactModel, {
  through: 'contact_tags',
});

sourceModel.hasMany(contactModel);
contactModel.belongsTo(sourceModel);

languageModel.hasMany(contactModel);
contactModel.belongsTo(languageModel);

reviewModel.hasMany(contactModel);
contactModel.belongsTo(reviewModel);

contactStatusModel.hasMany(contactModel);
contactModel.belongsTo(contactStatusModel);

contactModel.hasMany(phoneNumberModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
phoneNumberModel.belongsTo(contactModel);

contactModel.belongsToMany(userModel, {
  through: 'contact_visibleToUsers',
  as: 'users_contacts',
});
userModel.belongsToMany(contactModel, {
  through: 'contact_visibleToUsers',
  as: 'users_contacts',
});

userModel.hasMany(contactModel, {
  foreignKey: { name: 'created_by', allowNull: false },
  onDelete: 'cascade',
});
contactModel.belongsTo(userModel, {
  foreignKey: { name: 'created_by', allowNull: false },
  onDelete: 'cascade',
});

userModel.hasMany(contactModel, {
  foreignKey: { name: 'private_to', allowNull: true },
  onDelete: 'cascade',
});
contactModel.belongsTo(userModel, {
  foreignKey: { name: 'private_to', allowNull: true },
  onDelete: 'cascade',
});

export default contactModel;
