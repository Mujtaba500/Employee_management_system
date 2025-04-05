import { hash } from 'bcrypt';
import userModel from '../models/user/index.js';
import getRandomNumber from '../shared/common.js';
import bcrypt from 'bcrypt';

const seedUsers = async (departments, designations, roles, t) => {
  const users = [];
  console.log('seeding');
  let sTime = '2025-02-17T17:30:00.000Z';
  let eTime = '2025-02-17T17:30:00.000Z';
  const start = new Date(sTime);
  const end = new Date(eTime);

  // Calculate the difference. the difference comes in miliseconds so we have to convert to hours

  let differenceInMs;

  if (end > start) {
    differenceInMs = end - start;
  } else {
    differenceInMs = start - end;
  }

  // Convert milliseconds to hours
  const servingHours = differenceInMs / (1000 * 60 * 60);

  const getAdminRoleId = () => {
    return roles.find((role) => {
      return role.name === 'admin';
    }).id;
  };

  const getEmployeeRoleId = () => {
    return roles.find((role) => {
      return role.name === 'employee';
    }).id;
  };

  const getLineManagerId = () => {
    return roles.find((role) => {
      return role.name === 'line manager';
    }).id;
  };

  const getItManagerId = () => {
    return roles.find((role) => {
      return role.name === 'it manager';
    }).id;
  };

  console.log(designations[0].id);

  users.push(
    await userModel.create(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await bcrypt.hash('123456789', 10),
        contact: '1234567890',
        rating: 5,
        startTime: sTime.slice(11, 19),
        endTime: eTime.slice(11, 19),
        servingHours: servingHours,
        dob: '1999-08-03T17:00:00.000Z',
        gender: 'male',
        cnicNo: '3520203588852222328',
        departmentId: departments[getRandomNumber(departments.length)].id,
        designationId: designations[getRandomNumber(designations.length)].id,
        roleId: getEmployeeRoleId(),
      },

      { transaction: t }
    )
  );

  users.push(
    await userModel.create(
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        password: await bcrypt.hash('123456789', 5),
        contact: '0987654321',
        rating: 4,
        startTime: sTime.slice(11, 19),
        endTime: eTime.slice(11, 19),
        servingHours: servingHours,
        dob: '1995-06-15T17:00:00.000Z',
        gender: 'female',
        cnicNo: '3520203588852222329',
        departmentId: departments[getRandomNumber(departments.length)].id,
        designationId: designations[getRandomNumber(designations.length)].id,
        roleId: getEmployeeRoleId(),
      },
      { transaction: t }
    )
  );

  users.push(
    await userModel.create(
      {
        name: 'Alice Johnson',
        email: 'alicej@example.com',
        password: await bcrypt.hash('123456789', 10),
        contact: '1122334455',
        rating: 3,
        startTime: sTime.slice(11, 19),
        endTime: eTime.slice(11, 19),
        servingHours: servingHours,
        dob: '1992-03-10T17:00:00.000Z',
        gender: 'female',
        cnicNo: '35202035888522',
        departmentId: departments[getRandomNumber(departments.length)].id,
        designationId: designations[getRandomNumber(designations.length)].id,
        roleId: getEmployeeRoleId(),
      },
      { transaction: t }
    )
  );

  // admins
  users.push(
    await userModel.create(
      {
        name: 'mujtaba12',
        email: 'mujtaba@gmail.com',
        password: await bcrypt.hash('123456789', 10),
        contact: '1122334455',
        rating: 5,
        startTime: sTime.slice(11, 19),
        endTime: eTime.slice(11, 19),
        servingHours: servingHours,
        dob: '1992-03-10T17:00:00.000Z',
        gender: 'male',
        cnicNo: '35202035888522223301424',
        departmentId: departments[getRandomNumber(departments.length)].id,
        designationId: designations[getRandomNumber(designations.length)].id,
        roleId: getAdminRoleId(),
      },
      { transaction: t }
    )
  );

  users.push(
    await userModel.create(
      {
        name: 'adeel',
        email: 'adeel@gmail.com',
        password: await bcrypt.hash('123456789', 10),
        contact: '1122334455',
        rating: 5,
        startTime: sTime.slice(11, 19),
        endTime: eTime.slice(11, 19),
        servingHours: servingHours,
        dob: '1992-03-10T17:00:00.000Z',
        gender: 'male',
        cnicNo: '3520203588852222330142344',
        departmentId: departments[getRandomNumber(departments.length)].id,
        designationId: designations[getRandomNumber(designations.length)].id,
        roleId: getAdminRoleId(),
      },
      { transaction: t }
    )
  );

  await userModel.create(
    {
      name: 'zaeem',
      email: 'zaeem@gmail.com',
      password: await bcrypt.hash('123456789', 10),
      contact: '1122334455',
      rating: 5,
      startTime: sTime.slice(11, 19),
      endTime: eTime.slice(11, 19),
      servingHours: servingHours,
      dob: '1992-03-10T17:00:00.000Z',
      gender: 'male',
      cnicNo: '352020358822330145394',
      departmentId: departments[getRandomNumber(departments.length)].id,
      designationId: designations[getRandomNumber(designations.length)].id,
      roleId: getItManagerId(),
    },
    { transaction: t }
  );

  await userModel.create(
    {
      name: 'anas',
      email: 'anas@gmail.com',
      password: await bcrypt.hash('123456789', 10),
      contact: '1122334455',
      rating: 5,
      startTime: sTime.slice(11, 19),
      endTime: eTime.slice(11, 19),
      servingHours: servingHours,
      dob: '1992-03-10T17:00:00.000Z',
      gender: 'male',
      cnicNo: '35202035824233325394',
      departmentId: departments[getRandomNumber(departments.length)].id,
      designationId: designations[getRandomNumber(designations.length)].id,
      roleId: getLineManagerId(),
    },
    { transaction: t }
  );

  users.push(
    await userModel.create(
      {
        name: 'Ali Nasir',
        email: 'ali@gmail.com',
        password: await bcrypt.hash('123456789', 10),
        contact: '1122334455',
        rating: 5,
        startTime: sTime.slice(11, 19),
        endTime: eTime.slice(11, 19),
        servingHours: servingHours,
        dob: '1992-03-10T17:00:00.000Z',
        gender: 'male',
        cnicNo: '3520203588936280142344',
        departmentId: departments[getRandomNumber(departments.length)].id,
        designationId: designations[getRandomNumber(designations.length)].id,
        roleId: getAdminRoleId(),
      },
      { transaction: t }
    )
  );

  console.log(' Users seeded successfully');
  return users;
};

export default seedUsers;
