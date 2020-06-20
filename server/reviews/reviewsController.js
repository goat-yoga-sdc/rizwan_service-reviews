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
  getBySkinType: (req, res)=>{
    model.getBySkinType(req.params.productId, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  getBySkinShade: (req, res)=>{
    model.getBySkinShade(req.params.productId, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  getByAgeRange: (req, res)=>{
    model.getByAgeRange(req.params.productId, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  postHelpful: (req, res)=>{
    model.postHelpful(req.params.productId, req.body, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send('Successful post!');
      }
    });
  }
};

module.exports = controller;