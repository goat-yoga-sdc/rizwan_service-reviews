const db = require('../index.js');
//id must be analyzed to see if it is a numeric id, or a product name. Based on this, one of 2 query strings will be chosen.
const model = {
  getByProdId: (id, callback)=>{
    //Execute query by product ID if id is  number
    if (typeof id === number) {
      db.query('', (err, result) =>{
        if (err) { callback(err, null); } else { callback(null, result); }
      });
      //Else execute query by product name,
    } else if (typeof id === string) {
      db.query('', (err, result) =>{
        if (err) { callback(err, null); } else { callback(null, result); }
      });
    }
  },
  getBySkinType: (id, callback)=>{

  },
  getBySkinShade: (id, callback)=>{

  },
  getByAgeRange: (id, callback)=>{

  },
  postHelpful: (id, count, callback)=>{

  }
};

module.exports = model;