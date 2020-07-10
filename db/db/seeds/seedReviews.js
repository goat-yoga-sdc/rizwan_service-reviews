// This file inserts the random reviews into the db
const createReviews = require('./reviewsGenerator.js');
const db = require('../index.js');

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
