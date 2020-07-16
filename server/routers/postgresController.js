const model = require('../../Db/postgreSQL/reviews/reviewsModel.js');

const controller = {
  getByProdId: (req, res) => {
    model.getByProdId(req.params.productId, (err, result) => {
      err ?
        res.status(400).send(err) :
        res.status(200).send(result.rows);
    });
  },
  getByProdIdSort: (req, res) => {
    let column = '';
    let order = '';
    // console.log(`req.params.sortBy: ${req.params.sortBy}`);
    // Set column and order variables by interpreting value
    // Most Recent
    if (req.params.sortBy === '1') {
      column = 'reviewTime';
      order = 'DESC';
      // Oldest
    } else if (req.params.sortBy === '2') {
      column = 'reviewTime';
      order = 'ASC';
      // Lowest Rated
    } else if (req.params.sortBy === '3') {
      column = 'rating';
      order = 'ASC';
      // Highest Rated
    } else if (req.params.sortBy === '4') {
      column = 'rating';
      order = 'DESC';
      // Most Helpful
    } else if (req.params.sortBy === '5') {
      column = 'votes_up';
      order = 'DESC';
    }
    model.getByProdIdSort(req.params.productId, column, order, (err, result) => {
      err ?
        res.status(400).send(err) :
        res.status(200).send(result.rows);
    });
  },
  searchReviews: (req, res) => {
    model.searchReviews(req.params.productId, req.params.queryStr, (err, result) => {
      err ?
        res.status(400).send(err) :
        res.status(200).send(result.rows);
    });
  },
  getBySkinType: (req, res) => {
    model.getBySkinType(req.params.productId, req.params.skinType, (err, result) => {
      err ?
        res.status(400).send(err) :
        res.status(200).send(result.rows);
    });
  },
  getBySkinShade: (req, res) => {
    model.getBySkinShade(req.params.productId, req.params.skinShade, (err, result) => {
      err ?
        res.status(400).send(err) :
        res.status(200).send(result.rows);
    });
  },
  getByAgeRange: (req, res) => {
    model.getByAgeRange(req.params.productId, req.params.ageRange, (err, result) => {
      err ?
        res.status(400).send(err) :
        res.status(200).send(result.rows);
    });
  },
  postUpVote: (req, res) => {
    model.postUpVote(req.params.reviewId, (err, result) => {
      err ?
        res.status(400).send(err) :
        res.status(200).send(result.rows);
    });
  },
  postDownVote: (req, res) => {
    model.postDownVote(req.params.reviewId, (err, result) => {
      err ?
        res.status(400).send(err) :
        res.status(200).send(result.rows);
    });
  },
  postNewReview: (req, res) => {
    // req.body must have a key called 'reviewText'.
    model.postNewReview(req.body, req.params.productId, (err, result) => {
      (err) ?
        res.status(400).send(err) :
        res.status(200).send('successful post');
    });
  },
  deleteReviewById: (req, res) => {
    model.deleteReviewById(req.params.reviewId, (err, result) => {
      (err) ?
        res.status(400).send(err) :
        res.status(200).send('deleted post');
    });
  }
};

module.exports = controller;