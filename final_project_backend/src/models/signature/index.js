import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const signatureModel = sequelize.define(
  'signature',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    signer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    signer_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

export default signatureModel;
