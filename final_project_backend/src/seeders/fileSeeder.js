import fileModel from '../models/file/index.js';
import getRandomNumber from '../shared/common.js';

const seedFile = async (data, t) => {
  for (const contact of data.contacts) {
    await fileModel.bulkCreate(
      [
        {
          title: 'Turner Proposal',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          isSigned: false,
          dealId: data.deals[getRandomNumber(data.deals.length)].id,
          documentTypeId:
            data.documentTypes[getRandomNumber(data.documentTypes.length)].id,
          ownerId: data.owners[getRandomNumber(data.owners.length)].id,
          localeId: data.locales[getRandomNumber(data.locales.length)].id,
          contactId: contact.id,
        },
        {
          title: 'John Doe contract',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          isSigned: false,
          dealId: data.deals[getRandomNumber(data.deals.length)].id,
          documentTypeId:
            data.documentTypes[getRandomNumber(data.documentTypes.length)].id,
          ownerId: data.owners[getRandomNumber(data.owners.length)].id,
          localeId: data.locales[getRandomNumber(data.locales.length)].id,
          contactId: contact.id,
        },
      ],
      { transaction: t }
    );
  }
  console.log('files seeded');
};

export default seedFile;
