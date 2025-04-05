import contactStatusModel from '../models/contactStatus/index.js';

const seedcontactStatus = async (t) => {
  const statuses = await contactStatusModel.bulkCreate(
    [
      {
        name: 'Active',
      },
      { name: 'Inactive' },
      { name: 'Private' },
    ],
    { transaction: t }
  );
  console.log('contactStatus seeded successfully');
  return statuses;
};

export default seedcontactStatus;
