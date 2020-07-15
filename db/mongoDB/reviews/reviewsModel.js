const db = require('../index.js');
const reviewGenerator = require('../seeds/reviewsGenerator.js');
const Products = require('../index.js');
// Id must be analyzed to see if it is a numeric id, or a product name. Based on this, one of 2 query strings will be chosen.
const model = {
  getByProdId: (id, callback) => {

    // Execute query by product ID if id is number
    // Else execute query by product name
    if (parseInt(id) !== NaN) {

<<<<<<< HEAD
      Products.find({ productId: id })
        .then(result => callback(null, result))
        .catch(err => console.log(err))

    } else {

      Products.find({ productName: id })
        .then(result => callback(null, result))
        .catch(err => console.log(err))
=======
      Products.find({ productId: id },
        (err, result) => {
          (err) ? callback(err, null) : callback(null, result);
        });

    } else {

      Products.find({ productName: id },
        (err, result) => {
          (err) ? callback(err, null) : callback(null, result);
        });
>>>>>>> ae57066... convert model to fetch data from mongo, 4 more functions to go
    }
  },
  getBySkinType: (id, skinType, callback) => {

<<<<<<< HEAD
    Products.find({ productId: id, skinType: skinType })
      .then(result => callback(null, result))
      .catch(err => console.log(err))
=======
    Products.find({ productId: id, skinType: skinType },
      (err, result) => {
        (err) ? callback(err, null) : callback(null, result);
      });
>>>>>>> ae57066... convert model to fetch data from mongo, 4 more functions to go

  },
  searchReviews: (id, queryString, callback) => {

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
    }).lean().exec()
      .then(result => callback(null, result))
      .catch(err => console.log(err))

  },
  getByProdIdSort: (id, column, order, callback) => {
    // db.products.aggregate(
    //   [
    //     { $match: { productId: 1 } },
    //     { $sort: { rating: 1 } },
    //   ]
    // )

    // sort index is based on order
    let sortingIndex = (order === 'DESC') ? 1 : -1;
    // change column to match schema

    // Did not conform to DRY because sort has to take in an object with a column field as a key
    if (column === 'reviewTime') {

      Products.aggregate(
        [
          { $match: { productId: parseInt(id, 0) } },
          { $sort: { reviewTime: sortingIndex } }
        ]
      )
        .then(result => {
          // console.log(result)
          callback(null, result);
        })
        .catch(err => console.log(err));

    } else if (column === 'rating') {

      Products.aggregate(
        [
          { $match: { productId: parseInt(id, 0) } },
          { $sort: { rating: sortingIndex } }
        ]
      )
        .then(result => callback(null, result))
        .catch(err => console.log(err));

    } else {

      Products.aggregate(
        [
          { $match: { productId: parseInt(id, 0) } },
          { $sort: { votesUp: -1 } }
        ]
      )
        .then(result => callback(null, result))
        .catch(err => console.log(err));

    }

  },
  getBySkinShade: (id, skinShade, callback) => {

<<<<<<< HEAD
    Products.find({ productId: id, skinShade: skinShade })
      .then(result => callback(null, result))
      .catch(err => console.log(err));
=======
    Products.find({ productId: id, skinShade: skinShade },
      (err, result) => {
        (err) ? callback(err, null) : callback(null, result);
      });
>>>>>>> ae57066... convert model to fetch data from mongo, 4 more functions to go

  },
  getByAgeRange: (id, ageRange, callback) => {

<<<<<<< HEAD
    Products.find({ productId: id, ageRange: ageRange })
      .then(result => callback(null, result))
      .catch(err => console.log(err));
=======
    Products.find({ productId: id, ageRange: ageRange },
      (err, result) => {
        (err) ? callback(err, null) : callback(null, result);
      });
>>>>>>> ae57066... convert model to fetch data from mongo, 4 more functions to go

  },
  postUpVote: (id, callback) => {

    Products.findOneAndUpdate(
      { reviewId: id },
      { $inc: { votesUp: 1 } },
<<<<<<< HEAD
      { new: true })
      .then(result => callback(null, result))
      .catch(err => console.log(err));
=======
      { new: true },
      (err, result) => {
        (err) ? callback(err, null) : callback(null, result);
      });
>>>>>>> ae57066... convert model to fetch data from mongo, 4 more functions to go

  },
  postDownVote: (id, callback) => {

    Products.findOneAndUpdate(
      { reviewId: id },
      { $inc: { votesDown: 1 } },
<<<<<<< HEAD
      { new: true })
      .then(result => { callback(null, result) })
      .catch(err => console.log(err));
=======
      { new: true },
      (err, result) => {
        (err) ? callback(err, null) : callback(null, result);
      });
>>>>>>> ae57066... convert model to fetch data from mongo, 4 more functions to go

  },
  postNewReview: (body, id, callback) => {
    let queryStr = `INSERT INTO reviews (productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime) VALUES (${id}, "Lash Stick", 3, "A waste of practical Lash Stick!", "${body.reviewText}", 2.2, "No - I would not recommend this to a friend", 13, 5, false, "5/1/2011");`;

    db.query(queryStr, (err, result) => {
      (err) ? callback(err, null) : callback(null, result);
    });
  },
  deleteReviewById: (id, callback) => {

    Products.deleteOne({ reviewId: id })
      .then(result => { callback(null, result) })
      .catch(err => console.log(err));

  }
};

module.exports = model;
