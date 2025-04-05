import roleModel from '../models/role/index.js';

const seedRoles = async (t) => {
  const roles = await roleModel.bulkCreate(
    [
      {
        name: 'admin',
      },
      { name: 'line manager' },
      { name: 'it manager' },
      { name: 'employee' },
    ],
    { transaction: t }
  );
  console.log(' Roles seeded successfully');
  return roles;
};

export default seedRoles;
