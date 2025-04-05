import socialProfileTypeModel from '../models/socialProfile/socialProfileType/index.js';

const seedprofileType = async () => {
  try {
    await socialProfileTypeModel.bulkCreate([
      {
        name: 'facebook',
      },
      {
        name: 'instagram',
      },
      {
        name: 'linkedin',
      },
      {
        name: 'twitter',
      },
      {
        name: 'whatapp',
      },
    ]);
  } catch (error) {
    console.error(error);
  }
};

export default seedprofileType;
