const db = require('../index.js');
// Id must be analyzed to see if it is a numeric id, or a product name. Based on this, one of 2 query strings will be chosen.
const model = {
  getByProdId: (id, callback) => {
    // Execute query by product ID if id is  number
    if (parseInt(id) !== NaN) {
      // console.log(`Product ID : ${id}`);
      // Must specify each column, as I don't want user password and other fields being sent back
      db.query(`SELECT reviewId, productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE productId=${id};`, (err, result) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          callback(err, null);
        } else {
          // console.log('By id result : ', result);
          callback(null, result);
        }
      });
      // Else execute query by product name,
    } else {
      // console.log(`Product name : ${id}`);
      db.query(`SELECT reviewId, productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE productName="${id}";`, (err, result) => {
        if (err) { callback(err, null); } else {
          // console.log('By name result : ', result);
          callback(null, result);
        }
      });
    }
  },
  getBySkinType: (id, skinType, callback) => {
    db.query(`SELECT reviewId, productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE productId="${id}" AND skinType="${skinType}";`, (err, result) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        callback(err, null);
      } else {
        // console.log('result by skinType :', result);
        callback(null, result);
      }
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
    db.query(`SELECT reviewId, productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE productId="${id}" AND skinShade="${skinShade}";`, (err, result) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  getByAgeRange: (id, ageRange, callback) => {
    db.query(`SELECT reviewId, productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE productId="${id}" AND ageRange="${ageRange}";`, (err, result) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  postUpVote: (id, callback) => {
    db.query(`UPDATE reviews SET votes_up = votes_up + 1 WHERE reviewId=${id}`, (err, result) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  postDownVote: (id, callback) => {
    db.query(`UPDATE reviews SET votes_down = votes_down + 1 WHERE reviewId=${id}`, (err, result) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
};

module.exports = model;
