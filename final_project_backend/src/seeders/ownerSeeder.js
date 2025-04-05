import ownerModel from '../models/owner/index.js';

const seedOwner = async (t) => {
  const owners = await ownerModel.bulkCreate(
    [
      {
        name: 'Joe',
      },
      {
        name: 'John',
      },
      {
        name: 'Ahmad',
      },
      {
        name: 'Ali',
      },
      {
        name: 'Doe',
      },
    ],
    { transaction: t }
  );
  return owners;
};

export default seedOwner;
