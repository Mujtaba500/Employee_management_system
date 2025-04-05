import seedCompany from './companySeeder.js';
import seedOwner from './ownerSeeder.js';
import seedIndustry from './industrySeeder.js';
import seedCurrency from './currencySeeder.js';
import seedTag from './tagSeeder.js';
import seedSource from './sourceSeeder.js';
import seedProject from './projectSeeder.js';
import seedPipeline from './pipelineSeeder.js';
import dealStatusSeeder from './dealStatusSeeder.js';
import seedcontactStatus from './contactStatusSeeder.js';
import seedLanguage from './languageSeeder.js';
import seedCountry from './countrySeeder.js';
import reviewSeeder from './reviewSeeder.js';
import seedprofileType from './profileTypeSeeder.js';
import callStatusSeeder from './callStatusSeeder.js';
import seedLocales from './localeSeeder.js';
import seeddocumentType from './documentTypeSeeder.js';
import seedDepartment from './departmentSeeder.js';
import callLeaveTypeSeeder from './leaveTypeSeeder.js';
import callRoleSeeder from './roleSeeder.js';
import assetCategorySeeder from './assetCategorySeeder.js';
import statusSeeder from './statusSeeder.js';

const seedAll = async () => {
  try {
    await seedDepartment();
    await callLeaveTypeSeeder();
    await callRoleSeeder();
    await callLeaveTypeSeeder();
    await callRoleSeeder();
    await seedCompany();
    await seedOwner();
    await seedIndustry();
    await seedCurrency();
    await seedTag();
    await seedSource();
    await seedProject();
    await seedPipeline();
    await dealStatusSeeder();
    await seedcontactStatus();
    await seedLanguage();
    await seedCountry();
    await reviewSeeder();
    await seedprofileType();
    await callStatusSeeder();
    await seedLocales();
    await seeddocumentType();
    await assetCategorySeeder();
    await statusSeeder();
  } catch (error) {
    console.error(error);
  }
};

// seedAll();
