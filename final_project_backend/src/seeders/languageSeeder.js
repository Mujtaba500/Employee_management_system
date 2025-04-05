import languageModel from '../models/language/index.js';

const seedLanguage = async (t) => {
  const languages = await languageModel.bulkCreate(
    [
      {
        name: 'English',
      },
      { name: 'French' },
      { name: 'Hindi' },
    ],
    { transaction: t }
  );
  console.log('language seeded successfully');
  return languages;
};

export default seedLanguage;
