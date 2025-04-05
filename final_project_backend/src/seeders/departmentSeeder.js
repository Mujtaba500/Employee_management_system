import departmentModel from '../models/department/index.js';

const callDepartmentSeeder = async (t) => {
  const departments = await departmentModel.bulkCreate(
    [
      {
        name: 'Human Resourse',
      },
      { name: 'Sales and Marketing' },
      { name: 'Quality Assurance' },
      { name: 'Designing' },
      { name: 'Infrastructure' },
      { name: 'Software Development' },
    ],
    { transaction: t }
  );
  console.log(' Department seeded successfully');
  return departments;
};

export default callDepartmentSeeder;
