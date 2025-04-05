import { DataTypes } from 'sequelize';
import { sequelize } from '../../../db/config.js';
import contactModel from '../../contact/index.js';
import socialProfileTypeModel from '../socialProfileType/index.js';

const socialProfileDetailsModel = sequelize.define(
  'socialProfileDetails',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    URL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);

contactModel.hasMany(socialProfileDetailsModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
socialProfileDetailsModel.belongsTo(contactModel);

socialProfileTypeModel.hasMany(socialProfileDetailsModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
socialProfileDetailsModel.belongsTo(socialProfileTypeModel);

export default socialProfileDetailsModel;
