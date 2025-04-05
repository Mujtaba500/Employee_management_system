import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

import contactModel from '../contact/index.js';
import userModel from '../user/index.js';

const emailModel = sequelize.define(
  'email',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

userModel.hasMany(emailModel, {
  foreignKey: { name: 'from', allowNull: false },
  onDelete: 'cascade',
});
emailModel.belongsTo(userModel, {
  foreignKey: { name: 'from', allowNull: false },
});

contactModel.hasMany(emailModel, {
  foreignKey: { name: 'to', allowNull: false },
  onDelete: 'cascade',
});
emailModel.belongsTo(contactModel, {
  foreignKey: { name: 'to', allowNull: false },
});

export default emailModel;
