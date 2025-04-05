import { sequelize } from '../db/config.js';
import callStatusSeeder from './callStatusSeeder.js';
import seedCompany from './companySeeder.js';
import seedContact from './contactSeeder.js';
import seedcontactStatus from './contactStatusSeeder.js';
import seedCountry from './countrySeeder.js';
import seedCurrency from './currencySeeder.js';
import dealStatusSeeder from './dealStatusSeeder.js';
import seedDepartment from './departmentSeeder.js';
import seedDesignations from './designationSeeder.js';
import seeddocumentType from './documentTypeSeeder.js';
import seedIndustry from './industrySeeder.js';
import seedLanguage from './languageSeeder.js';
import seedLocales from './localeSeeder.js';
import seedOwner from './ownerSeeder.js';
import seedPipeline from './pipelineSeeder.js';
import seedprofileType from './profileTypeSeeder.js';
import seedProject from './projectSeeder.js';
import reviewSeeder from './reviewSeeder.js';
import seedSource from './sourceSeeder.js';
import seedTag from './tagSeeder.js';
import callRoleSeeder from './roleSeeder.js';
import seedRoles from './roleSeeder2.js';
import seedUsers from './employeeSeeder.js';
import { getAdmins } from '../shared/common.js';
import seedCalls from './callSeeder.js';
import seedFile from './fileSeeder.js';
import seedDeal from './dealSeeder.js';
import seedNote from './noteSeeder.js';
import callLeaveTypeSeeder from './leaveTypeSeeder.js';

const seedModule3 = async () => {
  const t = await sequelize.transaction();
  try {
    const data = {};
    const departments = await seedDepartment(t);
    const designations = await seedDesignations(departments, t);
    const roles = await seedRoles(t);
    await callLeaveTypeSeeder(t);

    data.users = await seedUsers(departments, designations, roles, t);
    data.companies = await seedCompany(t);
    data.owners = await seedOwner(t);
    data.industries = await seedIndustry(t);
    data.currencies = await seedCurrency(t);
    data.tags = await seedTag(t);
    data.sources = await seedSource(t);
    data.reviews = await reviewSeeder(t);
    data.languages = await seedLanguage(t);
    data.statuses = await seedcontactStatus(t);
    data.countries = await seedCountry(t);
    data.admins = getAdmins(data.users, roles);
    data.contacts = await seedContact(data, t);
    data.projects = await seedProject(t);
    data.pipelines = await seedPipeline(t);
    data.deal_statuses = await dealStatusSeeder(t);
    data.deals = await seedDeal(data, t);

    data.notes = await seedNote(data.contacts, data.admins, t);
    data.call_statuses = await callStatusSeeder(t);
    data.calls = await seedCalls(data, t);
    // await seedprofileType();

    data.locales = await seedLocales(t);
    data.documentTypes = await seeddocumentType(t);
    await seedFile(data, t);
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.error(error);
  }
};

seedModule3();
