const review = require('./reviewGenerator.js');
// const db = require('../index.js');


const insertMockData = function() {

  reviewData.forEach((review)=> {
    let product = random.product(100);
    db.query(`INSERT INTO reviews (productId, productName, user_id , reviewTitle, reviewText, rating, bottomLine, helpfulPeeps, reviewTime) VALUES(${product.id}, "${product.name}", ${random.user_id(400)}, "${random.reviewTitle()}", "${review.reviewText}", ${review.overall}, "${review.summary}", "${review.helpful}", "${review.reviewTime}");`, (err, result)=>{
      if (err) { console.error(err); } else { console.log('Review successfully seeded'); }
    });

    // console.log(`INSERT INTO reviews (productId, productName, user_id , reviewTitle, reviewText, rating, bottomLine, helpfulPeeps, reviewTime) VALUES(${random.productId(100)}, "${random.productName()}", ${random.user_id(400)}, "${random.reviewTitle()}", "${review.reviewText}", ${review.overall}, "${review.summary}", "${review.helpful}", "${review.reviewTime}");`);
  });
  // for (let i = 0; i < 10; i++) {
  //   console.log(`${review.productId(100)}, ${review.productName()}, ${review.user_id(400)}, ${review.reviewTitle()}, ${reviewData[i].reviewText}, ${reviewData[i].overall}, ${reviewData[i].summary}, ${reviewData[i].helpful}`);
  // }
  console.log('All reviews seeded successfully into DB');
};
//Change the number of reviews that we want created in this invocation
// insertMockData();

// const product = random.product(10);
// console.log(product.id, product.name);