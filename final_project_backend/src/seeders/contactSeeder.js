import contactModel from '../models/contact/index.js';
import phoneNumberModel from '../models/phoneNumber/index.js';
import getRandomNumber from '../shared/common.js';
import { getTags } from '../shared/common.js';

const seedContact = async (data, t) => {
  const contacts = [];

  const contact = await contactModel.create(
    {
      firstName: 'Ahmad',
      lastName: 'Ashir',
      profileImg: 'assets/img/avatar/avatar-19.jpg',
      jobTitle: 'SWE 2',
      email: 'ahmad@gmail.com',
      phoneNo1: '0389427',
      phoneNo2: '41uo48',
      dob: '1999-03-12',
      comments: 'hfsdhlahslfhskaljflsj',
      rating: 2,
      streetAddress: 'House#63165, street 7, Block Yellow',
      city: 'Lahore',
      province: 'Punjab',
      zipCode: '876',
      viewedAt: Date.now(),
      created_by: data.admins[getRandomNumber(data.admins.length)].id,
      visibility: 'Public',
      contactStatusId: data.statuses[getRandomNumber(data.statuses.length)].id,
      languageId: data.languages[getRandomNumber(data.languages.length)].id,
      reviewId: data.reviews[getRandomNumber(data.reviews.length)].id,
      countryId: data.countries[getRandomNumber(data.countries.length)].id,
      companyId: data.companies[getRandomNumber(data.companies.length)].id,
      ownerId: data.owners[getRandomNumber(data.owners.length)].id,
      industryId: data.industries[getRandomNumber(data.industries.length)].id,
      currencyId: data.currencies[getRandomNumber(data.currencies.length)].id,
      sourceId: data.sources[getRandomNumber(data.sources.length)].id,
    },
    { transaction: t }
  );

  contacts.push(contact);

  await phoneNumberModel.create(
    {
      number: '0389427',
      isMain: true,
      contactId: contact.id,
    },
    { transaction: t }
  );
  await phoneNumberModel.create(
    {
      number: '41uo48',
      isMain: false,
      contactId: contact.id,
    },
    { transaction: t }
  );

  await contact.addTag(getTags(data.tags), { transaction: t });

  const contact2 = await contactModel.create(
    {
      firstName: 'Ali',
      lastName: 'Khan',
      profileImg: 'assets/img/avatar/avatar-19.jpg',
      jobTitle: 'Game Developer',
      email: 'ali@gmail.com',
      dob: '1998-05-15',
      comments: 'Test comment 1',
      rating: 4,
      streetAddress: 'House#12, street 4, Block Green',
      city: 'Karachi',
      province: 'Sindh',
      zipCode: '5400',
      viewedAt: Date.now(),
      created_by: data.admins[getRandomNumber(data.admins.length)].id,
      visibility: 'Public',
      contactStatusId: data.statuses[getRandomNumber(data.statuses.length)].id,
      languageId: data.languages[getRandomNumber(data.languages.length)].id,
      reviewId: data.reviews[getRandomNumber(data.reviews.length)].id,
      countryId: data.countries[getRandomNumber(data.countries.length)].id,
      companyId: data.companies[getRandomNumber(data.companies.length)].id,
      ownerId: data.owners[getRandomNumber(data.owners.length)].id,
      industryId: data.industries[getRandomNumber(data.industries.length)].id,
      currencyId: data.currencies[getRandomNumber(data.currencies.length)].id,
      sourceId: data.sources[getRandomNumber(data.sources.length)].id,
    },
    { transaction: t }
  );

  contacts.push(contact2);

  await phoneNumberModel.create(
    {
      number: '038947339',
      isMain: true,
      contactId: contact2.id,
    },
    { transaction: t }
  );
  await phoneNumberModel.create(
    {
      number: '485920',
      isMain: false,
      contactId: contact2.id,
    },
    { transaction: t }
  );

  await contact2.addTag(getTags(data.tags), { transaction: t });

  // 3
  const contact3 = await contactModel.create(
    {
      firstName: 'Sara',
      lastName: 'Ahmed',
      profileImg: 'assets/img/avatar/avatar-19.jpg',
      jobTitle: 'SDE 3',
      email: 'sara@gmail.com',
      dob: '2000-10-08',
      comments: 'Test comment 2',
      rating: 5,
      streetAddress: 'House#90, street 3, Block Red',
      city: 'Islamabad',
      province: 'ICT',
      zipCode: '44000',
      viewedAt: Date.now(),
      created_by: data.admins[getRandomNumber(data.admins.length)].id,
      visibility: 'Public',
      contactStatusId: data.statuses[getRandomNumber(data.statuses.length)].id,
      languageId: data.languages[getRandomNumber(data.languages.length)].id,
      reviewId: data.reviews[getRandomNumber(data.reviews.length)].id,
      countryId: data.countries[getRandomNumber(data.countries.length)].id,
      companyId: data.companies[getRandomNumber(data.companies.length)].id,
      ownerId: data.owners[getRandomNumber(data.owners.length)].id,
      industryId: data.industries[getRandomNumber(data.industries.length)].id,
      currencyId: data.currencies[getRandomNumber(data.currencies.length)].id,
      sourceId: data.sources[getRandomNumber(data.sources.length)].id,
    },
    { transaction: t }
  );

  contacts.push(contact3);

  await phoneNumberModel.create(
    {
      number: '0321547',
      isMain: true,
      contactId: contact3.id,
    },
    { transaction: t }
  );
  await phoneNumberModel.create(
    {
      number: '852741',
      isMain: false,
      contactId: contact3.id,
    },
    { transaction: t }
  );

  await contact3.addTag(getTags(data.tags), { transaction: t });

  //4

  const contact4 = await contactModel.create(
    {
      firstName: 'Usman',
      lastName: 'Javed',
      profileImg: 'assets/img/avatar/avatar-19.jpg',
      jobTitle: 'Business Analyst',
      email: 'usman@gmail.com',
      phoneNo1: '0300112233',
      phoneNo2: '921147',
      dob: '2003-07-22',
      comments: 'Test comment 3',
      rating: 3,
      streetAddress: 'House#55, street 9, Block Blue',
      city: 'Peshawar',
      province: 'KPK',
      zipCode: '25000',
      viewedAt: Date.now(),
      created_by: data.admins[getRandomNumber(data.admins.length)].id,
      visibility: 'Public',
      contactStatusId: data.statuses[getRandomNumber(data.statuses.length)].id,
      languageId: data.languages[getRandomNumber(data.languages.length)].id,
      reviewId: data.reviews[getRandomNumber(data.reviews.length)].id,
      countryId: data.countries[getRandomNumber(data.countries.length)].id,
      companyId: data.companies[getRandomNumber(data.companies.length)].id,
      ownerId: data.owners[getRandomNumber(data.owners.length)].id,
      industryId: data.industries[getRandomNumber(data.industries.length)].id,
      currencyId: data.currencies[getRandomNumber(data.currencies.length)].id,
      sourceId: data.sources[getRandomNumber(data.sources.length)].id,
    },
    { transaction: t }
  );

  contacts.push(contact4);

  await phoneNumberModel.create(
    {
      number: '0300112233',
      isMain: true,
      contactId: contact4.id,
    },
    { transaction: t }
  );
  await phoneNumberModel.create(
    {
      number: '921147',
      isMain: false,
      contactId: contact4.id,
    },
    { transaction: t }
  );

  await contact4.addTag(getTags(data.tags), { transaction: t });

  // 5

  const contact5 = await contactModel.create(
    {
      firstName: 'John',
      lastName: 'Doe',
      profileImg: 'assets/img/avatar/avatar-19.jpg',
      jobTitle: 'Blockchain Dev',
      email: 'John@gmail.com',
      phoneNo1: '0309238472',
      phoneNo2: '583920',
      dob: '1995-02-18',
      comments: 'Test comment 4',
      rating: 4,
      streetAddress: 'House#29, street 6, Block White',
      city: 'Quetta',
      province: 'Balochistan',
      zipCode: '87300',
      viewedAt: Date.now(),
      created_by: data.admins[getRandomNumber(data.admins.length)].id,
      visibility: 'Public',
      contactStatusId: data.statuses[getRandomNumber(data.statuses.length)].id,
      languageId: data.languages[getRandomNumber(data.languages.length)].id,
      reviewId: data.reviews[getRandomNumber(data.reviews.length)].id,
      countryId: data.countries[getRandomNumber(data.countries.length)].id,
      companyId: data.companies[getRandomNumber(data.companies.length)].id,
      ownerId: data.owners[getRandomNumber(data.owners.length)].id,
      industryId: data.industries[getRandomNumber(data.industries.length)].id,
      currencyId: data.currencies[getRandomNumber(data.currencies.length)].id,
      sourceId: data.sources[getRandomNumber(data.sources.length)].id,
    },
    { transaction: t }
  );

  contacts.push(contact5);

  await phoneNumberModel.create(
    {
      number: '0309238472',
      isMain: true,
      contactId: contact5.id,
    },
    { transaction: t }
  );
  await phoneNumberModel.create(
    {
      number: '583920',
      isMain: false,
      contactId: contact5.id,
    },
    { transaction: t }
  );

  await contact5.addTag(getTags(data.tags), { transaction: t });

  console.log('contacts seeded successfully');
  return contacts;
};

export default seedContact;
