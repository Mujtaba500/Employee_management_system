import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const experienceInfoModel = sequelize.define(
  'ExperienceInfo',
  {
    CompanyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    completeDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    jobPosition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
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

export default experienceInfoModel;
