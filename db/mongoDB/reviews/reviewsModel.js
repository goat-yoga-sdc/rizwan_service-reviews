const db = require('../index.js');
const reviewGenerator = require('../seeds/reviewsGenerator.js');
const Products = require('../index.js');
// Id must be analyzed to see if it is a numeric id, or a product name. Based on this, one of 2 query strings will be chosen.
const model = {
  getByProdId: (id, callback) => {

    // Execute query by product ID if id is number
    // Else execute query by product name
    if (parseInt(id) !== NaN) {

      Products.find({ productId: id },
        (err, result) => {
          (err) ? callback(err, null) : callback(null, result);
        });

    } else {

      Products.find({ productName: id },
        (err, result) => {
          (err) ? callback(err, null) : callback(null, result);
        });
    }
  },
  getBySkinType: (id, skinType, callback) => {

    Products.find({ productId: id, skinType: skinType },
      (err, result) => {
        (err) ? callback(err, null) : callback(null, result);
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

    Products.find({ productId: id, skinShade: skinShade },
      (err, result) => {
        (err) ? callback(err, null) : callback(null, result);
      });

  },
  getByAgeRange: (id, ageRange, callback) => {

    Products.find({ productId: id, ageRange: ageRange },
      (err, result) => {
        (err) ? callback(err, null) : callback(null, result);
      });

  },
  postUpVote: (id, callback) => {

    Products.findOneAndUpdate(
      { reviewId: id },
      { $inc: { votesUp: 1 } },
      { new: true },
      (err, result) => {
        (err) ? callback(err, null) : callback(null, result);
      });

  },
  postDownVote: (id, callback) => {

    Products.findOneAndUpdate(
      { reviewId: id },
      { $inc: { votesDown: 1 } },
      { new: true },
      (err, result) => {
        (err) ? callback(err, null) : callback(null, result);
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
