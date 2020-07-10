/* eslint-disable camelcase */
// This file generates the rest of the review data in our review object
const faker = require('faker');
const randomReviewText = require('./reviewTextGenerator.js');

const skinTypes = ['Combination', 'Normal', 'Dry', 'Oily'];
const ageRanges = ['17-24', '25-30', '31-40', '41-50', '51-60', '60 & Up'];
const skinShades = ['Light', 'Medium', 'Deep', 'Rich'];

// Helper functions to randomly generate review data
const getRandomValue = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// This creates an array of product {id, name} objects, using the productTitles array copied over from Mrinal's code
const randomProductsGenerator = (numberOfProducts) => {
  const products = [];
  const productTitles = ['Lipstick', 'Lip Gloss', 'Eye Lashes', 'Lotion', 'Nail Polish', 'Concealer', 'Eyeliner', 'Brushes', 'Blender', 'Lash Stick'];
  const productsPerTitle = Math.ceil(numberOfProducts / productTitles.length);
  for (let i = 0; i < productTitles.length; i += 1) {
    for (let j = 0; j < productsPerTitle; j += 1) {
      products.push({
        id: parseInt(`${i}`),
        product_id: parseInt(`${j}`),
        name: productTitles[i]
      });
    }
  }
  // Will return an array of x length
  return products;
};

const randomUserId = (numberOfUsers) => Math.floor(Math.random() * numberOfUsers);

const randomReviewTitle = (productName) => {
  const opening = ['Don\'t even think about buying this', 'Loved this', 'Awesome', 'Horrible', 'Hated this', 'Great', 'You must buy this', 'A great deal for this', 'A waste of', 'Exceptionally'];
  const closing = ['.', '!', '.', '!!', '.'];
  const adjective = faker.commerce.productAdjective();
  return `${randomElement(opening)} ${adjective.toLowerCase()} ${productName}${randomElement(closing)}`;
};

const randomBottomLine = () => {
  const phrase = ['Yes - I would recommend this to a friend', 'No - I would not recommend this to a friend'];
  return `${randomElement(phrase)}`;
};

const randomRating = () => {
  const precision = 10; // 1 decimal place
  const randomnum = Math.floor(Math.random() * (5 * precision - 1 * precision) + 1 * precision) / (1 * precision);
  return randomnum;
};
// Used for testing above function
// for (let i = 0; i < 20; i++){
// console.log(randomRating());
// };

// Will return true 20% of the time
const randomVerifiedBuyer = () => Math.random() < 0.2;

const randomHelpful = () => {
  // get total number of votes
  const totalVotes = getRandomValue(2, 80);
  // get number of those votes who found review helpful
  const votes_up = getRandomValue(1, totalVotes);
  const votes_down = totalVotes - votes_up;
  const helpfulPeeps = [votes_up, votes_down];
  return helpfulPeeps;
};

const randomDate = () => {
  const randomValueBetween = (min, max) => Math.random() * (max - min) + min;
  // Start of date range
  const date1 = new Date('01-01-2000').getTime();
  // Current datetime at seed
  const date2 = new Date().getTime();
  if (date1 > date2) {
    return new Date(randomValueBetween(date2, date1)).toLocaleDateString();
  }
  return new Date(randomValueBetween(date1, date2)).toLocaleDateString();
};

const randomReview = (productName, reviewId, productId) => {
  const [votes_up, votes_down] = randomHelpful();
  let newReview = {
    id: reviewId,
    product_id: productId,
    reviewTitle: randomReviewTitle(productName),
    reviewText: randomReviewText(productName),
    rating: randomRating(),
    bottomLine: randomBottomLine(),
    votes_down,
    votes_up,
    verified_buyer: randomVerifiedBuyer(),
    reviewTime: randomDate(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    ageRange: ageRanges[Math.floor(Math.random() * ageRanges.length)],
    place: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    skinType: skinTypes[Math.floor(Math.random() * skinTypes.length)],
    skinShade: skinShades[Math.floor(Math.random() * skinShades.length)]
  }

  return newReview;
};

const productGenerator = function (productAmount, avgReviewsPerProduct) {
  const min = avgReviewsPerProduct / 2;
  const max = avgReviewsPerProduct + min;
  let products = [];

  const productTitles = ['Lipstick', 'Lip Gloss', 'Eye Lashes', 'Lotion', 'Nail Polish', 'Concealer', 'Eyeliner', 'Brushes', 'Blender', 'Lash Stick'];

  let reviewId = 0;

  for (let i = 0; i < productAmount; i++) {
    let amountOfReviews = getRandomValue(min, max);
    for (let j = 0; j < amountOfReviews; j++) {
      let itemName = randomElement(productTitles);
      products.push({
        id: reviewId,
        product_id: i,
        name: itemName
      });
      reviewId++;
    }
  }
  return products;
}

// let result = productGenerator(3, 2);
// console.log(result);
let i = 0;

const createReviews = (numberOfProducts, avgReviewsPerProduct) => {
  const products = productGenerator(numberOfProducts, avgReviewsPerProduct);
  // console.log(products);
  // This creates a range of the middle 50%, centered on the avg. In theory, a large enough selection will show values adhering to the avg.
  const reviewsArr = [];
  products.forEach(({ id, product_id, name }) => {
    reviewsArr.push(randomReview(name, id, product_id));
    i++
  });
  return reviewsArr;
};

console.log(createReviews(100, 10));

module.exports = createReviews;