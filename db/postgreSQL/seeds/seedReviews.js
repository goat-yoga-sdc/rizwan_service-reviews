const { randomReviewTitle, randomBottomLine, randomRating, randomVerifiedBuyer, randomHelpful, randomDate, randomElement } = require('./reviewsGenerator.js');
const randomReviewText = require('./reviewTextGenerator.js');
const faker = require('faker');
const fs = require('fs');

const writeReviews = fs.createWriteStream('./reviews.csv');
writeReviews.write('id,product_id,reviewTitle,reviewText,rating,bottomLine,votes_down,votes_up,verified_buyer,reviewTime,firstName,lastName,ageRange,place,skinType,skinShade\n', 'utf8');

// =================================================
// Parameters Legends
// =================================================
// writer and encoding for writing to csv
// count = total amount of entries.
// start id = review id. needed because i will make many csv files

const skinTypes = ['Combination', 'Normal', 'Dry', 'Oily'];
const ageRanges = ['17-24', '25-30', '31-40', '41-50', '51-60', '60 & Up'];
const skinShades = ['Light', 'Medium', 'Deep', 'Rich'];
const productsList = ['Lipstick', 'Lip Gloss', 'Eye Lashes', 'Lotion', 'Nail Polish', 'Concealer', 'Eyeliner', 'Brushes', 'Blender', 'Lash Stick'];

function writeReviewsToCSV(writer, encoding, count, startId, callback) {
  let i = count;
  let id = startId;

  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let productName = randomElement(productsList);

      const [votes_up, votes_down] = randomHelpful();
      const review_id = id;
      const product_id = Math.floor(Math.random() * count);
      const reviewTitle = randomReviewTitle(productName);
      const reviewText = randomReviewText(productName);
      const rating = randomRating();
      const bottomLine = randomBottomLine();
      const verified_buyer = randomVerifiedBuyer();
      const reviewTime = randomDate();

      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const ageRange = ageRanges[Math.floor(Math.random() * ageRanges.length)];
      const place = `${faker.address.city()}; ${faker.address.stateAbbr()}`;
      const skinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
      const skinShade = skinShades[Math.floor(Math.random() * skinShades.length)]

      // data in csv was weird.
      const data = `${review_id}, ${product_id}, ${reviewTitle}, ${JSON.stringify(reviewText)}, ${rating}, ${bottomLine}, ${votes_down}, ${votes_up}, ${verified_buyer}, ${reviewTime}, ${firstName}, ${lastName}, ${ageRange}, ${JSON.stringify(place)}, ${skinType}, ${skinShade}\n`;

      (i === 0) ?
        writer.write(data, encoding, callback) :
        ok = writer.write(data, encoding);

    } while (i > 0 && ok);

    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// writer, encoding, count, startId, callback
writeReviewsToCSV(writeReviews, 'utf-8', 60000000, 0, () => {
  writeReviews.end();
})