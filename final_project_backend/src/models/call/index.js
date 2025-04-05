import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

import userModel from '../user/index.js';
import contactModel from '../contact/index.js';
import callStatusModel from '../callStatus/index.js';

const callModel = sequelize.define(
  'call',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    followUpDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

userModel.hasMany(callModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
callModel.belongsTo(userModel);

contactModel.hasMany(callModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
callModel.belongsTo(contactModel);

callStatusModel.hasMany(callModel);
callModel.belongsTo(callStatusModel);

export default callModel;
