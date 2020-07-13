const mongoose = require('mongoose');

let database = 'mongodb://localhost/reviewSDC';

mongoose.connect(database, { useNewUrlParser: true }, (err) => {
  (err) ?
    console.log('Could not connect to mongodb') :
    console.log('Connected to reviewSDC');
});

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    index: true
  },
  productName: String,
  reviews: [{
    review_id: Number,
    product_id: Number,
    reviewTitle: String,
    reviewText: String,
    rating: Number,
    bottomLine: String,
    votes_down: Number,
    votes_up: Number,
    verified_buyer: String,
    reviewTime: Date,
    firstName: String,
    lastName: String,
    ageRange: String,
    place: String,
    skinType: String,
    skinShade: String
  }],
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;