import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const callStatusModel = sequelize.define(
  'callStatus',
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

export default callStatusModel;
