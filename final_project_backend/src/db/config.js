import { Sequelize } from 'sequelize';
import 'dotenv/config';

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

export const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
