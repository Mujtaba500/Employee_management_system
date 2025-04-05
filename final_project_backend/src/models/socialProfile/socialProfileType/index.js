import { DataTypes } from 'sequelize';
import { sequelize } from '../../../db/config.js';

const socialProfileTypeModel = sequelize.define(
  'socialProfileType',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

export default socialProfileTypeModel;
