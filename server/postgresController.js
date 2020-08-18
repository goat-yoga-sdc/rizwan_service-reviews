const model = require("../db/postgreSQL/reviews/reviewsModel.js");

const controller = {
  getByProdId: (req, res) => {
    model.getByProdId(req.params.productId, (err, result) => {
      err ? res.status(400).send(err) : res.status(200).send(result.rows);
    });
  },

  getByProdIdSort: (req, res) => {
    let column, order;
    let { sortBy, productId } = req.params;
    // Most Recent
    if (sortBy === "1") {
      column = "reviewTime";
      order = "DESC";
      // Oldest
    } else if (sortBy === "2") {
      column = "reviewTime";
      order = "ASC";
      // Lowest Rated
    } else if (sortBy === "3") {
      column = "rating";
      order = "ASC";
      // Highest Rated
    } else if (sortBy === "4") {
      column = "rating";
      order = "DESC";
      // Most Helpful
    } else if (sortBy === "5") {
      column = "votes_up";
      order = "DESC";
    }

    model.getByProdIdSort(productId, column, order, (err, result) => {
      err ? res.status(400).send(err) : res.status(200).send(result.rows);
    });
  },

  searchReviews: (req, res) => {
    let { productId, queryStr } = req.params;

    model.searchReviews(productId, queryStr, (err, result) => {
      err ? res.status(400).send(err) : res.status(200).send(result.rows);
    });
  },

  getBySkinType: (req, res) => {
    let { productId, skinType } = req.params;

    model.getBySkinType(productId, skinType, (err, result) => {
      err ? res.status(400).send(err) : res.status(200).send(result.rows);
    });
  },

  getBySkinShade: (req, res) => {
    let { productId, skinShade } = req.params;

    model.getBySkinShade(productId, skinShade, (err, result) => {
      err ? res.status(400).send(err) : res.status(200).send(result.rows);
    });
  },

  getByAgeRange: (req, res) => {
    let { productId, ageRange } = req.params;

    model.getByAgeRange(productId, ageRange, (err, result) => {
      err ? res.status(400).send(err) : res.status(200).send(result.rows);
    });
  },

  postUpVote: (req, res) => {
    model.postUpVote(req.params.reviewId, (err, result) => {
      err ? res.status(400).send(err) : res.status(200).send(result.rows);
    });
  },

  postDownVote: (req, res) => {
    model.postDownVote(req.params.reviewId, (err, result) => {
      err ? res.status(400).send(err) : res.status(200).send(result.rows);
    });
  },

  postNewReview: (req, res) => {
    // req.body must have a key called 'reviewText'.
    model.postNewReview(req.body, req.params.productId, (err, result) => {
      err ? res.status(400).send(err) : res.status(200).send("successful post");
    });
  },

  deleteReviewById: (req, res) => {
    model.deleteReviewById(req.params.reviewId, (err, result) => {
      err ? res.status(400).send(err) : res.status(200).send("deleted post");
    });
  },
};

module.exports = controller;
