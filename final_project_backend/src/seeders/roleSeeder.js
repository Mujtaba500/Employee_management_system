import roleModel from '../models/role/index.js';

const callRoleSeeder = async () => {
  try {
    await roleModel.bulkCreate([
      {
        name: 'admin',
      },
      { name: 'line manager' },
      { name: 'it manager' },
      { name: 'employee' },
    ]);
    console.log(' Roles seeded successfully');
  } catch (error) {
    console.error(error);
  }
};

export default callRoleSeeder;
