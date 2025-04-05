import countryModel from '../models/country/index.js';

const seedCountry = async (t) => {
  const countries = await countryModel.bulkCreate(
    [
      {
        name: 'USA',
      },
      { name: 'UK' },
      { name: 'India' },
      { name: 'Pakistan' },
    ],
    { transaction: t }
  );
  console.log('country seeded successfully');
  return countries;
};

export default seedCountry;
