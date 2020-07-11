/* eslint-disable camelcase */
// This file generates the rest of the review data in our review object
const faker = require('faker');
const randomReviewText = require('./reviewTextGenerator.js');

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
        id: parseInt(`${i}` + `${j}`, 10),
        name: productTitles[i],
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
  const randomNum = Math.floor(Math.random() * (5 * precision - 1 * precision) + 1 * precision) / (1 * precision);
  return randomNum;
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

const randomReview = (numberOfUsers, productName, productId) => {
  const [votes_up, votes_down] = randomHelpful();
  const newReview = {
    productId,
    productName,
    // eslint-disable-next-line camelcase
    user_id: randomUserId(numberOfUsers),
    reviewTitle: randomReviewTitle(productName),
    reviewText: randomReviewText(productName),
    rating: randomRating(),
    bottomLine: randomBottomLine(),
    votes_down,
    votes_up,
    verified_buyer: randomVerifiedBuyer(),
    reviewTime: randomDate(),

  };
  return newReview;
};

const createReviews = (numberOfProducts, numberOfUsers, avgReviewsPerProduct) => {
  const products = randomProductsGenerator(numberOfProducts);
  // console.log(products);
  // This creates a range of the middle 50%, centered on the avg. In theory, a large enough selection will show values adhering to the avg.
  const min = avgReviewsPerProduct / 2;
  const max = avgReviewsPerProduct + min;
  const reviewsArr = [];
  products.forEach(({ id, name }) => {
    const reviewsPerProduct = getRandomValue(min, max);
    for (let i = 0; i < reviewsPerProduct; i += 1) {
      reviewsArr.push(randomReview(numberOfUsers, name, id));
    }
  });
  console.log(reviewsArr)
  return reviewsArr;
};

// console.log(createReviews(3, 10, 4));

module.exports = createReviews;
