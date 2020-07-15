const db = require('../index.js');
const reviewGenerator = require('../seeds/reviewsGenerator.js');
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
<<<<<<< HEAD

    // VERY IMPORTANT FOR LATER
    // ========================================
    // Must search review of a specific product for speed!
    // index below allows me to search for text that i want
    // db.products.createIndex( { productName: "text", reviewTitle: "text", reviewText: "text", reviewText: "text" } )
    // ========================================

    // OPTION # 1: USE FIND
    // WEAKNESS: it has to be whole word!
    // lipstick works, but lip wouldn't. <= I must get results if lip is typed.
    // also figure out how to add indexes for faster search
    // ========================================================
    Products.find({
      productId: id,
      $text: { $search: queryString }
<<<<<<< HEAD
<<<<<<< HEAD
    }).lean().exec()
      .then(result => callback(null, result))
      .catch(err => console.log(err))
=======
    }
    ).lean().exec()
      .then(result => {
        callback(null, result);
      })
      .catch(err => console.log(err))
    // ========================================================
>>>>>>> 0c15610... refactor schema to add indexes for text search and searchReviews function works
=======
    }).lean().exec()
      .then(result => callback(null, result))
      .catch(err => console.log(err))
>>>>>>> 018cddd... add all necessary API routes

=======
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
>>>>>>> 4d86841... Revert "Mongo api"
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
  postNewReview: (body, id, callback) => {
    let queryStr = `INSERT INTO reviews (productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime) VALUES (${id}, "Lash Stick", 3, "A waste of practical Lash Stick!", "${body.reviewText}", 2.2, "No - I would not recommend this to a friend", 13, 5, false, "5/1/2011");`;

    db.query(queryStr, (err, result) => {
      (err) ? callback(err, null) : callback(null, result);
    });
  },
  deleteReviewById: (id, callback) => {
    let queryStr = `DELETE FROM reviews WHERE reviewId = ${id};`

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    Products.deleteOne({ reviewId: id })
      .then(result => { callback(null, result) })
      .catch(err => console.log(err));
=======
    Products.deleteOne({ reviewId: id },
      (err, result) => {
        (err) ? callback(err, null) : callback(null, result);
      });
>>>>>>> 0c15610... refactor schema to add indexes for text search and searchReviews function works
=======
    Products.deleteOne({ reviewId: id })
      .then(result => { callback(null, result) })
      .catch(err => console.log(err));
>>>>>>> 018cddd... add all necessary API routes

=======
    db.query(queryStr, (err, result) => {
      (err) ? callback(err, null) : callback(null, result);
    });
>>>>>>> 4d86841... Revert "Mongo api"
  }
};

module.exports = model;
