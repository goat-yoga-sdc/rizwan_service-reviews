const createReviews = require('./reviewsGenerator.js');
const fs = require('fs');

const randomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const writeReviews = fs.createWriteStream('./reviews.csv');
writeReviews.write('id,product_id,reviewTitle,reviewText,rating,bottomLine,votes_down,votes_up,verified_buyer,reviewTime,firstName,lastName,ageRange,place,skinType,skinShade\n', 'utf8');

// I plan on creating multiple csv files and uploading 3 csv segments containing reviews so that i don't exceed space.
// Which is why i'm creating startId to store where my previous write function stopped csv.

function writeReviewsToCSV(writer, encoding, count, startId, callback) {
  let i = count;
  let id = startId;

  // 6 products => 6 reviews each => ~36 reviews in total in csv file
  let reviewList = createReviews(6, 6)

  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      // sets what is written in csv file as data
      let productName = `${adjective} ${color} ${product}`;
      let _id = id;

      const data = `${_id},${productName}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }

    } while (i > 0 && ok);

    if (i > 0) { writer.once('drain', write); }
  }
  write()
  console.log('done');
}

// writeProductsToCSV(writeProducts, 'utf-8', 10000000, () => {
//   writeProducts.end();
// })

module.exports = insertProducts;