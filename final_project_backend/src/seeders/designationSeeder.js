import designationModel from '../models/designation/index.js';

const seedDesignations = async (departments, t) => {
  let designations = [];
  for (const department of departments) {
    switch (department.name) {
      case 'Human Resource':
        const d1 = await designationModel.bulkCreate(
          [
            { name: 'HR Manager', departmentId: department.id },
            { name: 'HR Coordinator', departmentId: department.id },
          ],
          { transaction: t }
        );
        designations = [...designations, ...d1];
        break;

      case 'Sales and Marketing':
        const d2 = await designationModel.bulkCreate(
          [
            { name: 'Sales Associate', departmentId: department.id },
            { name: 'Marketing Associate', departmentId: department.id },
          ],
          { transaction: t }
        );
        designations = [...designations, ...d2];
        break;

      case 'Designing':
        const d3 = await designationModel.bulkCreate(
          [
            { name: 'UI Designer', departmentId: department.id },
            { name: 'UX Designer', departmentId: department.id },
          ],
          { transaction: t }
        );
        designations = [...designations, ...d3];
        break;

      case 'Quality Assurance':
        const d4 = await designationModel.bulkCreate(
          [
            { name: 'Software QA', departmentId: department.id },
            { name: 'Security Tester', departmentId: department.id },
          ],
          { transaction: t }
        );
        designations = [...designations, ...d4];
        break;

      case 'Infrastructure':
        const d5 = await designationModel.bulkCreate(
          [
            {
              name: 'Associate DEVOPS Engineer',
              departmentId: department.id,
            },
            { name: 'Cloud Architect', departmentId: department.id },
          ],
          { transaction: t }
        );
        designations = [...designations, ...d5];
        break;

      case 'Software Development':
        const d6 = await designationModel.bulkCreate(
          [
            { name: 'Frontend Developer', departmentId: department.id },
            { name: 'FullStack Developer', departmentId: department.id },
          ],
          { transaction: t }
        );
        designations = [...designations, ...d6];
        break;

      default:
        break;
    }
  }
  console.log(' Designations seeded successfully');
  return designations;
};

export default seedDesignations;
