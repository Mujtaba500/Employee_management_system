import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const roleModel = sequelize.define(
  'Role',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 20],
          msg: 'Minimum length of role name is 3 and maximum is 20',
        },
        notEmpty: { msg: 'role name cannot be empty' },
        notNull: { msg: 'role name cannot be null' },
      },
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

export default roleModel;
