import localeModel from '../models/locale/index.js';

const seedLocales = async (t) => {
  const locales = await localeModel.bulkCreate(
    [
      {
        name: 'es',
      },
      { name: 'en' },
      { name: 'ru' },
    ],
    { transaction: t }
  );
  console.log('Locales seeded successfully');
  return locales;
};

// seedLocales();

export default seedLocales;
