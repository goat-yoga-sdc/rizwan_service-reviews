const fs = require('fs');
const faker = require('faker');
const { randomRating, randomBottomLine, randomVerifiedBuyer, randomDate } = require('./reviewsGenerator.js');

const writeProducts = fs.createWriteStream('products.csv');
writeProducts.write('id,productName,reviews\n', 'utf8');

const randomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// lists to create product names
const productTitles = ['Lipstick', 'Lip Gloss', 'Eye Lashes', 'Lotion', 'Nail Polish', 'Concealer', 'Eyeliner', 'Brushes', 'Blender', 'Lash Stick'];
const colorChoice = ['Pink', 'Hot Pink', 'Blue', 'Purple', 'Green', 'Black', 'Red', 'Indigo', 'Yellow', 'Maroon'];
const adjectiveList = ['Cool', 'Pretty', 'Sexy', 'Beautiful'];

// lists for review data
const skinTypes = ['Combination', 'Normal', 'Dry', 'Oily'];
const ageRanges = ['17-24', '25-30', '31-40', '41-50', '51-60', '60 & Up'];
const skinShades = ['Light', 'Medium', 'Deep', 'Rich'];

function writeProductsToCSV(writer, encoding, count, callback) {
  let i = count;
  let id = 0;

  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      let color = randomElement(colorChoice);
      let product = randomElement(productTitles);
      let adjective = randomElement(adjectiveList);

      // should give between 2-4 reviews per product
      let totalReviews = Math.floor(Math.random() * (5 - 2)) + 2;

      let _id = id;
      let productName = `${adjective} ${color} ${product}`;
      let reviewList = [];

      // creates multiple reviews (~3 in this case) for each product
      for (let reviews = 0; reviews < totalReviews; reviews++) {
        let reviewObj = {
          reviewId: reviews + 1,
          reviewTitle: faker.lorem.sentence(),
          reviewText: faker.lorem.paragraph(),
          rating: randomRating(),
          bottomLine: randomBottomLine(),
          votes_down: Math.floor(Math.random() * 20),
          votes_up: Math.floor(Math.random() * 20),
          verified_buyer: randomVerifiedBuyer(),
          reviewTime: randomDate(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          ageRange: randomElement(ageRanges),
          place: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
          skinType: randomElement(skinTypes),
          skinShade: randomElement(skinShades)
        }
        // this is EXACTLY like push, except 10X faster apparently!
        // push ~'totalReviews' amount of reviews into array.
        reviewList[reviews] = reviewObj;
      }

      const data = `${_id},${productName},${JSON.stringify(reviewList)}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
  console.log('done');
}

writeProductsToCSV(writeProducts, 'utf-8', 100, () => {
  writeProducts.end();
})