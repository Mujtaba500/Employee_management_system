import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const leavesModel = sequelize.define(
  'Leave',
  {
    fromDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'from date cannot be empty' },
        notNull: { msg: 'from date cannot be null' },
        isDate: { msg: 'from date must be date' },
      },
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'to date cannot be empty' },
        notNull: { msg: 'to date cannot be null' },
        isDate: { msg: 'to date must be date' },
      },
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [5, 1000],
          msg: 'Minimum length of reason is 5 and maximum is 1000',
        },
        notEmpty: { msg: 'reason cannot be empty' },
        notNull: { msg: 'reason cannot be null' },
      },
    },
    leaveTaken: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'leaveTaken cannot be empty' },
        notNull: { msg: 'leaveTaken cannot be null' },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'user Id cannot be empty' },
        notNull: { msg: 'user Id be null' },
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Decline', 'Approved'],
      allowNull: false,
    },
    leaveTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'leave type Id cannot be empty' },
        notNull: { msg: 'leave type Id Id be null' },
      },
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

export default leavesModel;
