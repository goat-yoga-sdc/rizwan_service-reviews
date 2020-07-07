const faker = require('faker');
const db = require('../index.js');

const skinTypes = ['Combination', 'Normal', 'Dry', 'Oily'];
const ageRanges = ['17-24', '25-30', '31-40', '41-50', '51-60', '60 & Up'];
const skinShades = ['Light', 'Medium', 'Deep', 'Rich'];

const createUser = () => {
  const user = {};
  user.password = faker.internet.password();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.username = faker.internet.userName(user.firstName, user.lastName);
  user.ageRange = ageRanges[Math.floor(Math.random() * ageRanges.length)];
  user.location = `${faker.address.city()}, ${faker.address.stateAbbr()}`;
  user.skinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
  user.skinShade = skinShades[Math.floor(Math.random() * skinShades.length)];
  return user;
};

const createUsers = (numberOfUsers) => {
  const usersArr = [];
  for (let i = 0; i < numberOfUsers; i += 1) {
    usersArr.push(createUser());
  }
  return usersArr;
};
// The number of users will come from the index file
const insertMockData = (numberOfUsers) => {
  const users = createUsers(numberOfUsers);
  users.forEach((user) => {
    db.query(`INSERT INTO users (username, passHash, firstName, lastName, ageRange, place, skinType, skinShade) VALUES("${user.username}", "${user.password}", "${user.firstName}", "${user.lastName}", "${user.ageRange}", "${user.location}", "${user.skinType}", "${user.skinShade}");`, (err) => {
      // eslint-disable-next-line no-console
      if (err) { console.error(err); }
      // else { console.log('User successfully seeded'); }
    });
    // console.log(user);
  });
  // eslint-disable-next-line no-console
  console.log('All users seeded successfully into DB');
};

module.exports = insertMockData;
