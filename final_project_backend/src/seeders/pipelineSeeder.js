import pipeLineModel from '../models/pipeline/index.js';

const seedPipeline = async (t) => {
  const pipelines = await pipeLineModel.bulkCreate(
    [
      {
        name: 'Pipeline 1',
      },
      {
        name: 'Pipeline 2',
      },
      {
        name: 'Pipeline 3',
      },
      {
        name: 'Pipeline 4',
      },
    ],
    { transaction: t }
  );
  console.log('pipelines seeded succesfully!');
  return pipelines;
};

export default seedPipeline;
