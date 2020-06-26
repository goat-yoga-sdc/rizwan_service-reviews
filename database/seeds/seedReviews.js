const createReviews = require('./reviewsGenerator.js');
const db = require('../index.js');


const insertMockData = (numberOfProducts, numberOfUsers, avgReviewsPerProduct) => {
  let reviewData = createReviews(numberOfProducts, numberOfUsers, avgReviewsPerProduct);
  reviewData.forEach((review)=> {
    db.query(`INSERT INTO reviews (productId, productName, user_id , reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime) VALUES(${review.productId}, "${review.productName}", ${review.user_id}, "${review.reviewTitle}", "${review.reviewText}", ${review.rating}, "${review.bottomLine}", ${review.votes_down}, ${review.votes_up}, ${review.verified_buyer}, "${review.reviewTime}");`, (err, result)=>{
      if (err) { console.error(err); } else { console.log('Review successfully seeded'); }
    });
  });
  console.log('All reviews seeded successfully into DB');
};

module.exports = insertMockData;

//need to reseed DB after this change, and then refactor the front-end