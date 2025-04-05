import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

import pipelineModel from '../pipeline/index.js';
import currencyModel from '../currency/index.js';
import contactModel from '../contact/index.js';
import projectModel from '../project/index.js';
import tagModel from '../tag/index.js';
import sourceModel from '../source/index.js';
import userModel from '../user/index.js';
import dealStatusModel from '../dealStatus/index.js';

const dealModel = sequelize.define(
  'deal',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    periodValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    expectedClosingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    followupDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM,
      values: ['low', 'medium', 'high'],
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

pipelineModel.hasMany(dealModel);
dealModel.belongsTo(pipelineModel);

currencyModel.hasMany(dealModel);
dealModel.belongsTo(currencyModel);

dealModel.belongsToMany(contactModel, { through: 'contact_deals' });
contactModel.belongsToMany(dealModel, { through: 'contact_deals' });

projectModel.belongsToMany(dealModel, { through: 'project_deals' });
dealModel.belongsToMany(projectModel, { through: 'project_deals' });

tagModel.belongsToMany(dealModel, { through: 'deal_tags' });
dealModel.belongsToMany(tagModel, { through: 'deal_tags' });

sourceModel.hasMany(dealModel);
dealModel.belongsTo(sourceModel);

userModel.belongsToMany(dealModel, { through: 'deal_assignees' });
dealModel.belongsToMany(userModel, { through: 'deal_assignees' });

dealStatusModel.hasMany(dealModel);
dealModel.belongsTo(dealStatusModel);

export default dealModel;
