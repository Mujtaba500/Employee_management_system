import dealStatusModel from '../models/dealStatus/index.js';

const dealStatusSeeder = async (t) => {
  const statuses = await dealStatusModel.bulkCreate(
    [
      {
        name: 'Open',
      },
      { name: 'Lost' },
      { name: 'Won' },
    ],
    { transaction: t }
  );
  console.log(' dealStatus seeded successfully');
  return statuses;
};

export default dealStatusSeeder;
