const model = require('../../database/reviews/reviewsModel.js');

const controller = {
  getByProdId: (req, res)=>{
    model.getByProdId(req.params.productId, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  getByProdIdSort: (req, res)=>{
    let column = '';
    let order = '';
    console.log(`req.params.sortBy: ${req.params.sortBy}`)
    //Most Recent
    if (req.params.sortBy === '1') {
      column = 'reviewTime';
      order = 'DESC'
    //Oldest
    } else if(req.params.sortBy === '2') {
      column = 'reviewTime';
      order = 'ASC'
    //Lowest Rated
    } else if(req.params.sortBy === '3') {
      column = 'rating';
      order = 'ASC'
    //Highest Rated
    } else if(req.params.sortBy === '4') {
      column = 'rating';
      order = 'DESC'
    //Most Helpful
    } else if(req.params.sortBy === '5') {
      column = 'votes_up';
      order = 'DESC'
    }
    console.log(`column: ${column}, order: ${order}`)
    model.getByProdIdSort(req.params.productId, column, order, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  searchReviews: (req, res)=>{
    model.searchReviews(req.params.productId, req.params.queryStr, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  getBySkinType: (req, res)=>{
    model.getBySkinType(req.params.productId, req.params.skinType, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  getBySkinShade: (req, res)=>{
    model.getBySkinShade(req.params.productId, req.params.skinShade, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  getByAgeRange: (req, res)=>{
    model.getByAgeRange(req.params.productId, req.params.ageRange, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  postUpVote: (req, res)=>{
    model.postUpVote(req.params.reviewId, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  postDownVote: (req, res)=>{
    model.postDownVote(req.params.reviewId, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  }
};

module.exports = controller;