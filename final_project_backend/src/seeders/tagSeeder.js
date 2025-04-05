import tagModel from '../models/tag/index.js';

const seedTag = async (t) => {
  const tags = await tagModel.bulkCreate(
    [
      {
        name: 'Label',
      },
      { name: 'Custom' },
      { name: 'Important' },
      { name: 'Static' },
    ],
    { transaction: t }
  );
  console.log('tag seeded successfully');
  return tags;
};

export default seedTag;
