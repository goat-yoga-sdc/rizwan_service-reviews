// This file inserts the random reviews into the db
const createReviews = require('./reviewsGenerator.js');
const db = require('../index.js');


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




const insertMockData = (numberOfProducts, numberOfUsers, avgReviewsPerProduct) => {
  const reviewData = createReviews(numberOfProducts, numberOfUsers, avgReviewsPerProduct);
  reviewData.forEach((review) => {
    db.query(`INSERT INTO reviews (productId, productName, user_id , reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime) VALUES(${review.productId}, "${review.productName}", ${review.user_id}, "${review.reviewTitle}", "${review.reviewText}", ${review.rating}, "${review.bottomLine}", ${review.votes_down}, ${review.votes_up}, ${review.verified_buyer}, "${review.reviewTime}");`, (err) => {
      // eslint-disable-next-line no-console
      if (err) { console.error(err); }
      // else { console.log('Review successfully seeded'); }
    });
  });
  // eslint-disable-next-line no-console
  console.log('All reviews seeded successfully into DB');
};

module.exports = insertMockData;
// Export this file, to run along with seed users from an index file
