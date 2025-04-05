import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const assetCategoryModel = sequelize.define(
  'assetCategory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },    
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },

  {
    underscored: true,
    timestamps: true,
    // paranoid: true,
  }
);

export default assetCategoryModel;
