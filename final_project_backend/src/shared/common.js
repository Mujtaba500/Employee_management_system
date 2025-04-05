const getRandomNumber = (length) => {
  return Math.floor(Math.random() * length);
};

export const getAdmins = (users, roles) => {
  const adminRoleId = roles.find((role) => {
    return role.name === 'admin';
  }).id;
  return users.filter((user) => {
    return user.roleId === adminRoleId;
  });
};

export const getTags = (dataTags) => {
  const tags = [];
  const end = getRandomNumber(4) + 1;
  for (let i = 0; i <= end; i++) {
    const tagIndex = getRandomNumber(dataTags.length);
    if (tags.includes(dataTags[tagIndex].id)) {
      continue;
    } else {
      tags.push(dataTags[tagIndex].id);
    }
  }
  return tags;
};

export const getMultiData = (data) => {
  const result = [];
  const end = getRandomNumber(4) + 1;
  for (let i = 0; i <= end; i++) {
    const dataIndex = getRandomNumber(data.length);
    if (result.includes(data[dataIndex].id)) {
      continue;
    } else {
      result.push(data[dataIndex].id);
    }
  }
  return result;
};

export default getRandomNumber;
