import callStatusModel from '../models/callStatus/index.js';

const callStatusSeeder = async (t) => {
  const statuses = await callStatusModel.bulkCreate(
    [
      {
        name: 'Busy',
      },
      { name: 'Unavailable' },
      { name: 'No Answer' },
      { name: 'Wrong Number' },
      { name: 'Left Voice Message' },
      { name: 'Moving Forward' },
    ],
    { transaction: t }
  );
  console.log(' Call Status seeded successfully');
  return statuses;
};

export default callStatusSeeder;
