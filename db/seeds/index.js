const seedUsers = require('./seedUsers.js');
const seedReviews = require('./seedReviews.js');

const seedDb = (numberOfProducts, numberOfUsers, avgReviewsPerProduct) => {
  seedUsers(numberOfUsers);
  seedReviews(numberOfProducts, numberOfUsers, avgReviewsPerProduct);
  // eslint-disable-next-line no-console
  console.log('DB seeded successfully and completely.');
};

seedDb(100, 400, 20);
