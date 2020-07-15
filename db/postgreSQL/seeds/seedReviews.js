const { randomBottomLine, randomRating, randomVerifiedBuyer, randomDate } = require('./reviewsGenerator.js');
const faker = require('faker');
const fs = require('fs');

const writeReviews = fs.createWriteStream('./reviews.csv');
writeReviews.write('review_id,product_id,reviewTitle,reviewText,rating,bottomLine,votes_down,votes_up,verified_buyer,reviewTime,firstName,lastName,ageRange,place,skinType,skinShade\n', 'utf8');

// =================================================
// Parameters Legends
// =================================================
// writer and encoding for writing to csv
// count = total amount of entries.
// start id = review id. needed because i will make many csv files

const skinTypes = ['Combination', 'Normal', 'Dry', 'Oily'];
const ageRanges = ['17-24', '25-30', '31-40', '41-50', '51-60', '60 & Up'];
const skinShades = ['Light', 'Medium', 'Deep', 'Rich'];

function writeReviewsToCSV(writer, encoding, count, startId, callback) {
  let i = count;
  let id = startId;
  let productIndex = 0;

  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      productIndex += .4;

      const reviewId = id;
      // 1 product has 2 - 3 reviews
      const productId = Math.floor(productIndex) + 1;
      const reviewTitle = faker.lorem.sentence();
      const reviewText = faker.lorem.sentences(2);
      const rating = randomRating();
      const bottomLine = randomBottomLine();
      const votesDown = Math.floor(Math.random() * (20 - 5)) + 5;
      const votesUp = Math.floor(Math.random() * (20 - 5)) + 5;
      const verifiedBuyer = randomVerifiedBuyer();
      const reviewTime = randomDate();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const ageRange = ageRanges[Math.floor(Math.random() * ageRanges.length)];
      const place = `${faker.address.city()}; ${faker.address.stateAbbr()}`;
      const skinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
      const skinShade = skinShades[Math.floor(Math.random() * skinShades.length)]

      // data in csv was weird.
      const data = `${reviewId},${productId},${reviewTitle},${reviewText},${rating},${bottomLine},${votesDown},${votesUp},${verifiedBuyer},${reviewTime},${firstName},${JSON.stringify(lastName)},${ageRange},${JSON.stringify(place)},${skinType},${skinShade}\n`;

      (i === 0) ?
        writer.write(data, encoding, callback) :
        ok = writer.write(data, encoding);

    } while (i > 0 && ok);

    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
  console.log('reviews => .csv COMPLETE')
}

// writer, encoding, count, startId, callback
writeReviewsToCSV(writeReviews, 'utf-8', 15, 0, () => {
  writeReviews.end();
})