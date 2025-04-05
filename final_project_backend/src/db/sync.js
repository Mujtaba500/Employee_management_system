import { sequelize } from './config.js';
import connectDB from './config.js';
import allRoutes from '../routes/routes.js';

const syncDb = async () => {
  try {
    // Force: true will drop all the tables and recreate them
    await connectDB();

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(async () => {
      await sequelize.sync({ alter: true });
      console.log('Database synced successfully!');
    });
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

await syncDb();

export default syncDb;
