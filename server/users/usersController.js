const model = require('../database/model.js');

const controller = {
  getUser: (req, res)=>{
    model.getUser(req.params.id, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  postAuth: (req, res)=>{
    //username and hashed password will be sent in body
    model.postAuth(req.body, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send('Successful post!');
      }
    });
  }
};

module.exports = controller;