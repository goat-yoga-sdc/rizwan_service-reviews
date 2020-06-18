const reviewData = require('reviews.js');


//Create functions to randomly generate this data
const review = {
  productId: () => {

  },
  productName: () => {

  },
  // eslint-disable-next-line camelcase
  user_id: () => {

  },
  reviewTitle: () => {

  }
};


//Add reviewData.reviewTime here and to schema
const insertMockData = function(numberOfreviews) {
  reviewData.forEach((product)=>{
    db.query(`INSERT INTO reviews (productId, productName, user_id , reviewTitle, reviewText, rating, bottomLine, helpfulPeeps) VALUES("${review.productId()}", "${review.productName()}", "${review.user_id()}", "${review.reviewTitle()}", "${reviewData.reviewText}", "${reviewData.overall}", "${reviewData.summary}", "${reviewData.helpful}");`, (err, result)=>{
      if (err) { console.error(err); } else { console.log('Review successfully seeded'); }
    });
  });
  console.log('All reviews seeded successfully into DB');
};
//Change the number of reviews that we want created in this invocation
insertMockData(20);

