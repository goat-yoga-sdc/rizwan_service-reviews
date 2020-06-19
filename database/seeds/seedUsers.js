const faker = require('faker');
const db = require('../index.js');

const skinTypes = ['Combination', 'Normal', 'Dry', 'Oily'];
const ageRanges = ['17-24', '25-30', '31-40', '41-50', '51-60', '60 & Up'];
const skinShades = ['Light', 'Medium', 'Deep', 'Rich'];

const createUser = () => {
  let user = {};
  user.password = faker.internet.password();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.username = faker.internet.userName(user.firstName, user.lastName);
  user.ageRange = ageRanges[Math.floor(Math.random() * ageRanges.length)];
  user.location = faker.address.city() + ', ' + faker.address.stateAbbr();
  user.skinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
  user.skinShade = skinShades[Math.floor(Math.random() * skinShades.length)];
  return user;
};

const createUsers = (numberOfUsers) => {
  let usersArr = [];
  for (let i = 0; i < numberOfUsers; i++) {
    usersArr.push(createUser());
  }
  return usersArr;
};

const insertMockData = function(numberOfUsers) {
  let users = createUsers(numberOfUsers);
  users.forEach((user)=>{
    db.query(`INSERT INTO users (username, passHash, firstName, lastName, ageRange, place, skinType, skinShade) VALUES("${user.username}", "${user.password}", "${user.firstName}", "${user.lastName}", "${user.ageRange}", "${user.location}", "${user.skinType}", "${user.skinShade}");`, (err, result)=>{
      if (err) { console.error(err); } else { console.log('User successfully seeded'); }
    });
    // console.log(user);
  });
  console.log('All users seeded successfully into DB');
};
//Change the number of users that we want created in this invocation
insertMockData(400);
