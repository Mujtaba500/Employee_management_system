import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

import userModel from '../user/index.js';
import noteModel from '../note/index.js';

const commentModel = sequelize.define(
  'comment',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

userModel.hasMany(commentModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
commentModel.belongsTo(userModel);

noteModel.hasMany(commentModel, {
  foreignKey: { allowNull: false },
  onDelete: 'cascade',
});
commentModel.belongsTo(noteModel);

export default commentModel;
