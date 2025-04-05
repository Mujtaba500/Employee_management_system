import leaveType from '../models/leaveType/index.js';

const callLeaveTypeSeeder = async (t) => {
  try {
    await leaveType.bulkCreate(
      [
        {
          name: 'Sick',
          allowed: 10,
        },
        { name: 'Casual', allowed: 10 },
        { name: 'Other', allowed: 10 },
      ],
      { transaction: t }
    );
    console.log(' leave types seeded successfully');
  } catch (error) {
    console.error(error);
  }
};

export default callLeaveTypeSeeder;
