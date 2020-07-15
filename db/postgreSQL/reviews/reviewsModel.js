const db = require('../index.js');
const reviewGenerator = require('../seeds/reviewsGenerator.js');
// Id must be analyzed to see if it is a numeric id, or a product name. Based on this, one of 2 query strings will be chosen.
const model = {
  getByProdId: (id, callback) => {
    // Execute query by product ID if id is  number
    if (parseInt(id) !== NaN) {
      // console.log(`Product ID : ${id}`);
      // Must specify each column, as I don't want user password and other fields being sent back

      let queryStr = `SELECT * FROM reviews INNER JOIN products ON reviews.product_id = products.id WHERE product_id = ${id};`

      db.query(queryStr, (err, result) => {
        err ? callback(err, null) : callback(null, result);
      });
      // Else execute query by product name,
    } else {
      // console.log(`Product name : ${id}`);

      let queryStr = `SELECT * FROM reviews INNER JOIN products ON reviews.product_id = products.id WHERE products.productName = '${id}';`

      db.query(queryStr, (err, result) => {
        err ? callback(err, null) : callback(null, result);
      });
    }
  },
  getBySkinType: (id, skinType, callback) => {
    let queryStr = `SELECT * FROM reviews INNER JOIN products ON reviews.product_id = products.id WHERE skinType = '${skinType}';`

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });

  },
  searchReviews: (id, queryString, callback) => {
    // console.log(id, queryString);
    // Had to create a fulltext index in schema.sql for this to work
    db.query(`SELECT reviewId, productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE productId=${id} AND MATCH (productName, reviewTitle, reviewText, bottomLine) AGAINST ("${queryString}" IN NATURAL LANGUAGE MODE);`, (err, result) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        callback(err, null);
      } else {
        // console.log('query result:', result);
        callback(null, result);
      }
    });
  },
  getByProdIdSort: (id, column, order, callback) => {
    db.query(`SELECT reviewId, productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE productId="${id}" ORDER BY ${column} ${order};`, (err, result) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        callback(err, null);
      } else {
        // console.log(`result ordered by ${column}, ${order} :`, result);
        callback(null, result);
      }
    });
  },
  getBySkinShade: (id, skinShade, callback) => {
    console.log(typeof skinShade)
    let queryStr = `SELECT * FROM reviews INNER JOIN products ON reviews.product_id = products.id WHERE product_id = ${id} AND skinShade = '${skinShade}';`

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },
  getByAgeRange: (id, ageRange, callback) => {
    let queryStr = `SELECT * FROM reviews INNER JOIN products ON reviews.product_id = products.id WHERE product_id = ${id} AND ageRange = '${ageRange}';`

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },
  postUpVote: (id, callback) => {
    let queryStr = `UPDATE reviews SET votes_up = votes_up + 1 WHERE review_id=${id};`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },
  postDownVote: (id, callback) => {
    let queryStr = `UPDATE reviews SET votes_down = votes_down + 1 WHERE review_id=${id};`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },
  postNewReview: (body, id, callback) => {
    let queryStr = `INSERT INTO reviews (productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime) VALUES (${id}, "Lash Stick", 3, "A waste of practical Lash Stick!", "${body.reviewText}", 2.2, "No - I would not recommend this to a friend", 13, 5, false, "5/1/2011");`;

    db.query(queryStr, (err, result) => {
      (err) ? callback(err, null) : callback(null, result);
    });
  },
  deleteReviewById: (id, callback) => {
    let queryStr = `DELETE FROM reviews WHERE reviewId = ${id};`

    db.query(queryStr, (err, result) => {
      (err) ? callback(err, null) : callback(null, result);
    });
  }
};

module.exports = model;
