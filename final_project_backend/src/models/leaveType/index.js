import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const leaveTypeModel = sequelize.define(
  'LeaveType',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 20],
          msg: 'Minimum length of leave type name is 3 and maximum is 20',
        },
        notEmpty: { msg: 'leave type name cannot be empty' },
        notNull: { msg: 'leave type name cannot be null' },
      },
    },
    allowed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'allowed cannot be empty' },
        notNull: { msg: 'allowed cannot be null' },
        isInt: { msg: 'allowed must be integer' },
      },
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

export default leaveTypeModel;
