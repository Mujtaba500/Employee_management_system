import industryModel from '../models/industry/index.js';

const seedIndustry = async (t) => {
  const industries = await industryModel.bulkCreate(
    [
      {
        name: 'Tech',
      },
      {
        name: 'Pharma',
      },
      {
        name: 'Textile',
      },
      {
        name: 'Chemical',
      },
      {
        name: 'Manufacturing',
      },
    ],
    { transaction: t }
  );
  return industries;
};

export default seedIndustry;
