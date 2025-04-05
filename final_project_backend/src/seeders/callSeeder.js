import callModel from '../models/call/index.js';
import getRandomNumber from '../shared/common.js';

const seedCalls = async (data, t) => {
  for (const contact of data.contacts) {
    await callModel.bulkCreate(
      [
        {
          followUpDate: '11/03/2023',
          note: 'Discussion related to finalisation of project',
          UserId: data.admins[getRandomNumber(data.admins.length)].id,
          contactId: contact.id,
          callStatusId:
            data.call_statuses[getRandomNumber(data.call_statuses.length)].id,
        },
        {
          followUpDate: '11/03/2023',
          note: 'Onboarding and discussion related to deadlines',

          UserId: data.admins[getRandomNumber(data.admins.length)].id,
          contactId: contact.id,
          callStatusId:
            data.call_statuses[getRandomNumber(data.call_statuses.length)].id,
        },
      ],
      { transaction: t }
    );
  }
  console.log('Calls seeded');
};

export default seedCalls;
