import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const companyModel = sequelize.define(
  'company',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);

export default companyModel;
