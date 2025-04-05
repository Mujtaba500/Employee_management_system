import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const attendanceModel = sequelize.define(
  'Attendance',
  {
    checkin: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'checkin cannot be empty' },
        notNull: { msg: 'checkin cannot be null' },
        isDate: { msg: 'checkin must be date' },
      },
    },
    checkinStatus: {
      type: DataTypes.ENUM,
      values: ['Late', 'On Time'],
      allowNull: false,
    },
    checkout: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        notEmpty: { msg: 'checkout cannot be empty' },
        isDate: { msg: 'checkout must be date' },
      },
    },
    checkoutStatus: {
      type: DataTypes.ENUM,
      values: ['Early', 'On Time'],
      allowNull: true,
    },
    breakIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    breakOut: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    totalBreakTime: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'user Id cannot be empty' },
        notNull: { msg: 'user Id be null' },
      },
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

export default attendanceModel;
