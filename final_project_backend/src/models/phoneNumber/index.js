import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const phoneNumberModel = sequelize.define(
  'phoneNumber',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    isMain: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);

export default phoneNumberModel;
