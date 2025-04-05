import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';
import departmentModel from '../department/index.js';

const designationModel = sequelize.define(
  'designation',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);

departmentModel.hasMany(designationModel, {
  foreignKey: { name: 'departmentId', allowNull: false },
  onDelete: 'cascade',
});
designationModel.belongsTo(departmentModel, {
  foreignKey: { name: 'departmentId', allowNull: false },
});

export default designationModel;
