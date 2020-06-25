const db = require('../index.js');
//id must be analyzed to see if it is a numeric id, or a product name. Based on this, one of 2 query strings will be chosen.
const model = {
  getByProdId: (id, callback)=>{
    //Execute query by product ID if id is  number
    if (parseInt(id) !== NaN) {
      console.log(`Product ID : ${id}`);
      db.query(`SELECT reviewId, productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, helpfulPeeps, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE productId=${id};`, (err, result) =>{
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          // console.log('By id result : ', result);
          callback(null, result);
        }
      });
      //Else execute query by product name,
    } else {
      console.log(`Product name : ${id}`);
      db.query(`SELECT reviewId, productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, helpfulPeeps, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE productName="${id}";`, (err, result) =>{
        if (err) { callback(err, null); } else {
          // console.log('By name result : ', result);
          callback(null, result);
        }
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