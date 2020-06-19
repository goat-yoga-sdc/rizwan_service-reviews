const db = require('../index.js');

const model = {
  getUser: (id, callback)=>{
    db.query('', (err, result) =>{
      if (err) { callback(err, null); } else { callback(null, result); }
    });
  },
  postAuth: ({username, passHash}, callback)=>{
    db.query('', (err, result) =>{
      if (err) { callback(err, null); } else { callback(null, result); }
    });
  }
};

module.exports = model;