import statusModel from '../models/status/index.js';

const statusSeeder = async () => {
  try {
    await statusModel.bulkCreate(
      [
        { id: 1, name: 'Active' },
        { id: 2, name: 'Inactive' },
        { id: 3, name: 'Pending' },
        { id: 4, name: 'Completed' },
        { id: 5, name: 'Canceled' },
        { id: 6, name: 'On Hold' },
      ],
      {
        validate: true,
      }
    );
    console.log('Statuses seeded successfully');
  } catch (error) {
    console.error('Error seeding statuses:', error);
  }
};

export default statusSeeder;
