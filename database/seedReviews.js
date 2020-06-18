const faker = require('faker');
const reviewData = require('./reviews.js');
const db = require('./index.js');


//Create functions to randomly generate this data
const review = {
  productId: (quantity) => {
    return Math.floor(Math.random() * quantity);
  },
  //create random Name for now
  productName: () => {
    return faker.commerce.productName();
  },
  // eslint-disable-next-line camelcase
  user_id: (quantity) => {
    return Math.floor(Math.random() * quantity);
  },
  reviewTitle: () => {
    return faker.commerce.productAdjective() + ' ' + faker.random.words();
  }
};


//Add reviewData.reviewTime here and to schema
const insertMockData = function(numberOfreviews) {
  reviewData.forEach((product)=>{
    db.query(`INSERT INTO reviews (productId, productName, user_id , reviewTitle, reviewText, rating, bottomLine, helpfulPeeps) VALUES(${review.productId(100)}, "${review.productName()}", ${review.user_id(400)}, "${review.reviewTitle()}", "${reviewData.reviewText}", "${reviewData.overall}", "${reviewData.summary}", "${reviewData.helpful}");`, (err, result)=>{
      if (err) { console.error(err); } else { console.log('Review successfully seeded'); }
    });
  });
  console.log('All reviews seeded successfully into DB');
};
//Change the number of reviews that we want created in this invocation
insertMockData(20);

