const model = require('../../db/users/usersModel.js');

const controller = {
  getUser: (req, res)=>{
    console.log('User id : ', req.params);
    model.getUser(req.params.userId, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  },
  postAuth: (req, res)=>{
    //username and hashed password will be sent in body
    console.log('Request body : ', req.body);
    model.postAuth(req.body, (err, result)=>{
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  }
};

module.exports = controller;