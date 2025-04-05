import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const statusModel = sequelize.define(
  'Status',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 20],
          msg: 'Minimum length of reason is 3 and maximum is 20',
        },
        notEmpty: { msg: 'status name cannot be empty' },
        notNull: { msg: 'status name cannot be null' },
      },
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

export default statusModel;
