const model = require('../../DB/mongoDB/reviews/reviewsModel.js');

const controller = {
  getByProdId: (req, res) => {

    model.getByProdId(req.params.productId, (err, result) => {
      (err) ?
        res.status(400).send(err) :
        res.status(200).json(result);

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
    // console.log(req.params)

    model.getByProdIdSort(req.params.productId, column, order, (err, result) => {
      (err) ?
        res.status(400).send(err) :
        res.status(200).json(result);
    });
  },
  searchReviews: (req, res) => {
    let { productId, queryStr } = req.params;

    model.searchReviews(productId, queryStr, (err, result) => {
      (err) ?
        res.status(400).send(err) :
        res.status(200).json(result);
    });
  },
  getBySkinType: (req, res) => {
    let { productId, skinType } = req.params;

    model.getBySkinType(productId, skinType, (err, result) => {
      (err) ?
        res.status(400).send(err) :
        res.status(200).json(result);
    });
  },
  getBySkinShade: (req, res) => {
    let { productId, skinShade } = req.params;

    model.getBySkinShade(productId, skinShade, (err, result) => {
      (err) ?
        res.status(400).send(err) :
        res.status(200).json(result);
    });
  },
  getByAgeRange: (req, res) => {
    let { productId, ageRange } = req.params;

    model.getByAgeRange(productId, ageRange, (err, result) => {
      (err) ?
        res.status(400).send(err) :
        res.status(200).json(result);
    });
  },
  postUpVote: (req, res) => {

    model.postUpVote(req.params.reviewId, (err, result) => {
      (err) ?
        res.status(400).send(err) :
        res.status(200).json(result);
    });
  },
  postDownVote: (req, res) => {

    model.postDownVote(req.params.reviewId, (err, result) => {
      (err) ?
        res.status(400).send(err) :
        res.status(200).json(result);
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
