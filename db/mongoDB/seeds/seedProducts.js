const fs = require('fs');
const faker = require('faker');
const { randomRating, randomBottomLine, randomVerifiedBuyer, randomDate } = require('./reviewsGenerator.js');
const Products = require('../index.js');
// Use this command in the shell to import csv to mongoDB
// mongoimport --type csv -d reviewSDC -c products --headerline --drop products.csv


const writeProducts = fs.createWriteStream('products.csv');
writeProducts.write('reviewId,productId,productName,reviewTitle,reviewText,rating,bottomLine,votesDown,votesUp,verifiedBuyer,reviewTime,firstName,lastName,ageRange,place,skinType,skinShade\n', 'utf8');


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

  let reviewsPlaceholder = 0.2;

  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      // made to give me 5 reviews each product.
      reviewsPlaceholder += 0.2

      let color = randomElement(colorChoice);
      let product = randomElement(productTitles);
      let adjective = randomElement(adjectiveList);

      // should give between 2-4 reviews per product
      let totalReviews = Math.floor(Math.random() * (5 - 2)) + 2;

      let reviewId = id;
      let productId = Math.floor(reviewsPlaceholder);
      let productName = `${adjective} ${color} ${product}`;
      let reviewTitle = faker.lorem.sentence();
      let reviewText = faker.lorem.paragraph();
      let rating = randomRating();
      let bottomLine = randomBottomLine();
      let votesDown = Math.floor(Math.random() * 20);
      let votesUp = Math.floor(Math.random() * 20);
      let verifiedBuyer = randomVerifiedBuyer();
      let reviewTime = randomDate();
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();
      let ageRange = randomElement(ageRanges);
      let place = `${faker.address.city()}, ${faker.address.stateAbbr()}`;
      let skinType = randomElement(skinTypes);
      let skinShade = randomElement(skinShades);

      const data = `${reviewId},${productId},${productName},${reviewTitle},${reviewText},${rating},${bottomLine},${votesDown},${votesUp},${verifiedBuyer},${reviewTime},${firstName},${lastName},${ageRange},${JSON.stringify(place)},${skinType},${skinShade}\n`;


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

seedProductsIntoMongo = (count) => {

  let productList = [];

  // creates obj w/ name, price, img
  for (let i = 0; i < count; i++) {
    let color = randomElement(colorChoice);
    let product = randomElement(productTitles);
    let adjective = randomElement(adjectiveList);


    let productObj = {
      review_id: i + 1,
      product_id: Math.floor(i / 5),
      productName: `${adjective} ${color} ${product}`,
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
    };

    console.log(productObj.review_id);

    productList[i] = productObj;
  }

  Products.insertMany(productList, (err) => {
    err ? console.log(err) : console.log('unit was seeded');
  });
}

// seedProductsIntoMongo(3);