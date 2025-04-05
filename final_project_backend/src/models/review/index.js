import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const reviewModel = sequelize.define(
  'review',
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
  }
);

export default reviewModel;
