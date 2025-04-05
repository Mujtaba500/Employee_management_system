import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const currencyModel = sequelize.define(
  'currency',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);

export default currencyModel;
