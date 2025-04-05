import sourceModel from '../models/source/index.js';

const seedSource = async (t) => {
  const sources = await sourceModel.bulkCreate(
    [
      {
        name: 'John Doe',
      },
      { name: 'Joe Doe' },
      { name: 'John Smith' },
      { name: 'Richard Doe' },
    ],
    { transaction: t }
  );
  console.log('source seeded successfully');
  return sources;
};

export default seedSource;
