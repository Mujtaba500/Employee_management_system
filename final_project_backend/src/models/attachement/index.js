import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const attachementModel = sequelize.define('attachement', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  // To: {

  // },
  attachement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default attachementModel;
