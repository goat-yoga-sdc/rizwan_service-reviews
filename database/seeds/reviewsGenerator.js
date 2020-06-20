//This file generates the rest of the review data in our review object
const randomReviewText = require('./reviewTextGenerator.js');
const faker = require('faker');

//Helper functions to randomly generate review data
const getRandomValue = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomElement = (array) => {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

//This simulates an array of product {id, name} object I would get from Mrinal through proxy server
const randomProductsGenerator = (numberOfProducts) => {
  let products = [];
  for (let i = 0; i < numberOfProducts; i++) {
    products.push({
      id: i,
      name: faker.commerce.productName()
    });
  }
  //Will return an array of x length
  return products;
};

const randomUserId = (numberOfUsers) => {
  return Math.floor(Math.random() * numberOfUsers);
};

const randomReviewTitle = (productName) => {
  return `${faker.commerce.productAdjective()} ${faker.random.words()} ${productName}`;
};

const randomBottomLine = (productName) => {
  let opening = ['Don\'t even think about buying this', 'Loved this', 'Awesome', 'Horrible', 'Hated this', 'Great', 'You must buy this', 'A great deal for this', 'A waste of', 'Exceptionally'];
  let closing = ['.', '!', '.', '!!', '.'];
  let adjective = faker.commerce.productAdjective();
  let words = faker.random.words();
  return `${randomElement(opening)} ${adjective.toLowerCase()} ${words.toLowerCase()} ${productName}${randomElement(closing)}`;
};

const randomRating = () => {
  let precision = 10; // 1 decimal
  let randomnum = Math.floor(Math.random() * (5 * precision - 1 * precision) + 1 * precision) / (1 * precision);
  return randomnum;
};
//Used for testing above function
// for (let i = 0; i < 20; i++){
// console.log(randomRating());
// };

const randomHelpful = () =>{
  //get total number of votes
  let totalVotes = getRandomValue(2, 60);
  //get number of those votes who found review helpful
  let numberOfHelpful = getRandomValue(1, totalVotes);
  let helpfulPeeps = [numberOfHelpful, totalVotes];
  return helpfulPeeps;
};

const randomDate = () => {
  const randomValueBetween = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  date1 = new Date('01-01-2000').getTime();
  date2 = new Date().getTime();
  if ( date1 > date2) {
    return new Date(randomValueBetween(date2, date1)).toLocaleDateString();
  } else {
    return new Date(randomValueBetween(date1, date2)).toLocaleDateString();
  }
};

const randomReview = (numberOfUsers, productName, productId)=>{
  let newReview = {
    productId: productId,
    productName: productName,
    // eslint-disable-next-line camelcase
    user_id: randomUserId(numberOfUsers),
    reviewTitle: randomReviewTitle(productName),
    reviewText: randomReviewText(productName),
    rating: randomRating(),
    bottomLine: randomBottomLine(productName),
    helpfulPeeps: randomHelpful(),
    reviewTime: randomDate()
  };
  return newReview;
};

const createReviews = (numberOfProducts, numberOfUsers, avgReviewsPerProduct) => {
  let products = randomProductsGenerator(numberOfProducts);
  //This creates a range of the middle 50%, centered on the avg. In theory, a large enough selection will show values adhering to the avg.
  let min = avgReviewsPerProduct / 2;
  let max = avgReviewsPerProduct + min;
  let reviewsArr = [];
  products.forEach(({id, name})=>{
    let reviewsPerProduct = getRandomValue(min, max);
    for (let i = 0; i < reviewsPerProduct; i++) {
      reviewsArr.push(randomReview(numberOfUsers, name, id));
    }
  });
  return reviewsArr;
};

console.log(createReviews(10, 40, 8));

module.exports = createReviews;