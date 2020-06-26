const db = require('../index.js');
//id must be analyzed to see if it is a numeric id, or a product name. Based on this, one of 2 query strings will be chosen.
const model = {
  getByProdId: (id, callback)=>{
    //Execute query by product ID if id is  number
    if (parseInt(id) !== NaN) {
      console.log(`Product ID : ${id}`);
      db.query(`SELECT reviewId, productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE productId=${id};`, (err, result) =>{
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
      db.query(`SELECT reviewId, productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE productName="${id}";`, (err, result) =>{
        if (err) { callback(err, null); } else {
          // console.log('By name result : ', result);
          callback(null, result);
        }
      });
    }
  },
  getBySkinType: (id, callback)=>{
    db.query(``, (err, result) =>{
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  getBySkinShade: (id, callback)=>{
    db.query(``, (err, result) =>{
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  getByAgeRange: (id, callback)=>{
    db.query(``, (err, result) =>{
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  postUpVote: (id, callback)=>{
    db.query(`UPDATE reviews SET votes_up = votes_up + 1 WHERE reviewId=${id}`, (err, result) =>{
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  postDownVote: (id, callback)=>{
    db.query(`UPDATE reviews SET votes_down = votes_down + 1 WHERE reviewId=${id}`, (err, result) =>{
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = model;