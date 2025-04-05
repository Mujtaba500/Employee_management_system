import currencyModel from '../models/currency/index.js';

const seedCurrency = async (t) => {
  const currencies = await currencyModel.bulkCreate(
    [
      {
        currency: 'Dollar',
      },
      { currency: 'Euro' },
      { currency: 'Rupees' },
      { currency: 'Dirham' },
    ],
    { transaction: t }
  );
  console.log('currency seeded successfully');
  return currencies;
};

export default seedCurrency;
