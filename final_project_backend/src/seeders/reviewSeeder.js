import reviewModel from '../models/review/index.js';

const reviewSeeder = async (t) => {
  const reviews = await reviewModel.bulkCreate(
    [
      {
        name: 'Lowest',
      },
      { name: 'Highest' },
      { name: 'Medium' },
    ],
    { transaction: t }
  );
  console.log(' review seeded successfully');
  return reviews;
};

export default reviewSeeder;
