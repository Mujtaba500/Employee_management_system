import dealModel from '../models/deal/index.js';
import { getMultiData, getTags } from '../shared/common.js';
import getRandomNumber from '../shared/common.js';

const seedDeal = async (data, t) => {
  const deals = [];
  const deal = await dealModel.create(
    {
      name: 'Deal 1',
      value: 300000,
      period: '03 months',
      periodValue: 100000,
      dueDate: '12-03-2025',
      expectedClosingDate: '11-12-1999',
      followupDate: '01-15-2026',
      priority: 'medium',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      pipeLineId: data.pipelines[getRandomNumber(data.pipelines.length)].id,
      currencyId: data.currencies[getRandomNumber(data.currencies.length)].id,
      sourceId: data.sources[getRandomNumber(data.sources.length)].id,
      statusId:
        data.deal_statuses[getRandomNumber(data.deal_statuses.length)].id,
    },
    { transaction: t }
  );

  await deal.addTag(getTags(data.tags), { transaction: t });
  await deal.addProject(getMultiData(data.projects), { transaction: t });
  await deal.addContact(getMultiData(data.contacts), { transaction: t });
  await deal.addUsers(getMultiData(data.users), { transaction: t });

  deals.push(deal);

  // deal 2

  const deal2 = await dealModel.create(
    {
      name: 'Deal 2',
      value: 400000,
      period: '04 months',
      periodValue: 100000,
      dueDate: '12-03-2025',
      expectedClosingDate: '11-12-1999',
      followupDate: '01-15-2026',
      priority: 'high',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      pipeLineId: data.pipelines[getRandomNumber(data.pipelines.length)].id,
      currencyId: data.currencies[getRandomNumber(data.currencies.length)].id,
      sourceId: data.sources[getRandomNumber(data.sources.length)].id,
      statusId:
        data.deal_statuses[getRandomNumber(data.deal_statuses.length)].id,
    },
    { transaction: t }
  );

  await deal2.addTag(getTags(data.tags), { transaction: t });
  await deal2.addProject(getMultiData(data.projects), { transaction: t });
  await deal2.addContact(getMultiData(data.contacts), { transaction: t });
  await deal2.addUsers(getMultiData(data.users), { transaction: t });

  deals.push(deal2);

  // deal 3

  const deal3 = await dealModel.create(
    {
      name: 'Deal 3',
      value: 600000,
      period: '07 months',
      periodValue: 85714,
      dueDate: '12-03-2025',
      expectedClosingDate: '11-12-1999',
      followupDate: '01-15-2026',
      priority: 'low',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      pipeLineId: data.pipelines[getRandomNumber(data.pipelines.length)].id,
      currencyId: data.currencies[getRandomNumber(data.currencies.length)].id,
      sourceId: data.sources[getRandomNumber(data.sources.length)].id,
      statusId:
        data.deal_statuses[getRandomNumber(data.deal_statuses.length)].id,
    },
    { transaction: t }
  );

  await deal3.addTag(getTags(data.tags), { transaction: t });
  await deal3.addProject(getMultiData(data.projects), { transaction: t });
  await deal3.addContact(getMultiData(data.contacts), { transaction: t });
  await deal3.addUsers(getMultiData(data.users), { transaction: t });

  deals.push(deal3);

  console.log('deals seeded');
  return deals;
};

export default seedDeal;
