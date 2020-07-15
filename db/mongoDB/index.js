const mongoose = require('mongoose');

let database = 'mongodb://localhost/reviewSDC';

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
<<<<<<< HEAD
=======
  autoIndex: false
>>>>>>> 0c15610... refactor schema to add indexes for text search and searchReviews function works
}, (err) => {
  (err) ?
    console.log('Could not connect to mongodb') :
    console.log('Connected to reviewSDC');
});

const Schema = mongoose.Schema;
// f

const ProductSchema = new Schema({
  reviewId: {
    type: Number,
    unique: true
  },
<<<<<<< HEAD
  productId: Number,
  productName: { type: String },
  reviewTitle: { type: String },
  reviewText: { type: String },
=======
  productId: {
    type: Number,
    unique: false
  },
  productName: { type: String, index: true },
  reviewTitle: { type: String, index: true },
  reviewText: { type: String, index: true },
>>>>>>> 0c15610... refactor schema to add indexes for text search and searchReviews function works
  rating: Number,
  bottomLine: { type: String, index: true },
  votesDown: Number,
  votesUp: Number,
  verifiedBuyer: String,
  reviewTime: Date,
  firstName: String,
  lastName: String,
  ageRange: String,
  place: String,
  skinType: String,
  skinShade: String
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;