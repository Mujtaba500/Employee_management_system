import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const assetModel = sequelize.define('Asset', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.INTEGER, //remember to change agar mujtaba changes type
    allowNull: true,
    defaultValue: null
  },
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  serialNumber: {
    type: DataTypes.INTEGER,
    autoincrement: true,
  },
  allocatedTo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue : null
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
  underscored: true,
});

export default assetModel;
