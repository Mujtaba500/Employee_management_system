import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

import userModel from '../user/index.js';
import contactModel from '../contact/index.js';
import attachementModel from '../attachement/index.js';

const noteModel = sequelize.define(
  'note',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // ARRAYS NOT SUPPORTED IN MYSQL
    // attachement: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   allowNull: false,
    //   defaultValue: [''],
    // },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

userModel.hasMany(noteModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
noteModel.belongsTo(userModel);

contactModel.hasMany(noteModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
noteModel.belongsTo(contactModel);

noteModel.hasMany(attachementModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
attachementModel.belongsTo(noteModel);

export default noteModel;
