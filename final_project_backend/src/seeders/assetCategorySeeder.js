import assetCategoryModel from '../models/assetCategory/index.js';

const assetCategorySeeder = async () => {
  try {
    await assetCategoryModel.bulkCreate([
      { type: 'software' },
      { type: 'Hardware' },
    ]);
    console.log('Asset Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding asset categories:', error);
  }
};

export default assetCategorySeeder;
