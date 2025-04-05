import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

import dealModel from '../deal/index.js';
import ownerModel from '../owner/index.js';
import contactModel from '../contact/index.js';
import documentTypeModel from '../documentType/index.js';
import localeModal from '../locale/index.js';
import signatureModel from '../signature/index.js';

const fileModel = sequelize.define(
  'file',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isSigned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

contactModel.hasMany(fileModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
fileModel.belongsTo(contactModel);

ownerModel.hasMany(fileModel);
fileModel.belongsTo(ownerModel);

dealModel.hasMany(fileModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
fileModel.belongsTo(dealModel);

documentTypeModel.hasMany(fileModel);
fileModel.belongsTo(documentTypeModel);

localeModal.hasMany(fileModel);
fileModel.belongsTo(localeModal);

fileModel.hasMany(signatureModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
signatureModel.belongsTo(fileModel);

export default fileModel;
