import noteModel from '../models/note/index.js';
import getRandomNumber from '../shared/common.js';

const seedNote = async (contacts, users, t) => {
  for (const contact of contacts) {
    await noteModel.bulkCreate(
      [
        {
          title: 'Note 1',
          note: 'Remembar to upload file and validate',
          attachements: ['assets/img/icons/profile-upload-img.svg'],
          UserId: users[getRandomNumber(users.length)].id,
          contactId: contact.id,
        },
        {
          title: 'Note 2',
          note: 'Remembar to test thoroughly and ensure data integrity',
          attachements: ['assets/img/icons/profile-upload-img.svg'],
          UserId: users[getRandomNumber(users.length)].id,
          contactId: contact.id,
        },
      ],
      { transaction: t }
    );
  }
};

export default seedNote;
