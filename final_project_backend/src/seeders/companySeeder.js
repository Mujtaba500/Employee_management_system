import companyModel from '../models/company/index.js';

const seedCompany = async (t) => {
  const companies = await companyModel.bulkCreate(
    [
      {
        name: 'Amazon',
      },
      { name: 'Google Inc' },
      { name: 'Netflix' },
      { name: 'Deline Media' },
      { name: 'Apple Co' },
    ],
    { transaction: t }
  );
  console.log('company seeded successfully');
  return companies;
};

export default seedCompany;
