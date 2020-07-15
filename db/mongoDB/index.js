const mongoose = require('mongoose');

let database = 'mongodb://localhost/reviewSDC';

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
    unique: true,
    index: true
  },
  productId: {
    type: Number,
    unique: false
  },
  productName: String,
  reviewTitle: String,
  reviewText: String,
  rating: Number,
  bottomLine: String,
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