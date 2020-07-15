const mongoose = require('mongoose');

let database = 'mongodb://localhost/reviewSDC';

<<<<<<< HEAD
mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
<<<<<<< HEAD
<<<<<<< HEAD
=======
  autoIndex: false
>>>>>>> 0c15610... refactor schema to add indexes for text search and searchReviews function works
=======
>>>>>>> 018cddd... add all necessary API routes
}, (err) => {
=======
mongoose.connect(database, { useNewUrlParser: true }, (err) => {
>>>>>>> 4d86841... Revert "Mongo api"
  (err) ?
    console.log('Could not connect to mongodb') :
    console.log('Connected to reviewSDC');
});

const Schema = mongoose.Schema;
// f

const ProductSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    index: true
  },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 018cddd... add all necessary API routes
  productId: Number,
  productName: { type: String },
  reviewTitle: { type: String },
  reviewText: { type: String },
<<<<<<< HEAD
=======
  productId: {
    type: Number,
    unique: false
  },
  productName: { type: String, index: true },
  reviewTitle: { type: String, index: true },
  reviewText: { type: String, index: true },
>>>>>>> 0c15610... refactor schema to add indexes for text search and searchReviews function works
=======
>>>>>>> 018cddd... add all necessary API routes
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
=======
  productName: String,
  reviews: [{
    reviewId: {
      type: Number,
      index: true
    },
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
  }]
>>>>>>> 4d86841... Revert "Mongo api"
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;