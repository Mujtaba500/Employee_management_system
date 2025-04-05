import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const workFromHomeModel = sequelize.define(
  'WorkFromHome',
  {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Start date cannot be empty' },
        notNull: { msg: 'Start date cannot be null' },
        isDate: { msg: 'Start date must be date' },
      },
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'End date cannot be empty' },
        notNull: { msg: 'End date cannot be null' },
        isDate: { msg: 'End date must be date' },
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
  },
  {
    paranoid: true,
    underscored: true,
  }
);

export default workFromHomeModel;
