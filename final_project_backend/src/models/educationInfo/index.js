import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const educationalinformationModel = sequelize.define(
  'EducationalInfo',
  {
    institutionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    completeDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);

export default educationalinformationModel;
