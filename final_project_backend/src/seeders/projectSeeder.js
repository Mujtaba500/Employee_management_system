import projectModel from '../models/project/index.js';

const seedProject = async (t) => {
  const projects = await projectModel.bulkCreate(
    [
      {
        name: 'Project 1',
      },
      {
        name: 'Project 2',
      },
      {
        name: 'Project 3',
      },
      {
        name: 'Project 4',
      },
    ],
    { transaction: t }
  );
  return projects;
};

export default seedProject;
