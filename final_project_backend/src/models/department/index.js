import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const departmentModel = sequelize.define(
  'department',
  {
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

export default departmentModel;
