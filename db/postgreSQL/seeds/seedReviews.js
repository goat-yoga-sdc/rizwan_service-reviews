const createReviews = require('./reviewsGenerator.js');
const fs = require('fs');

const writeReviews = fs.createWriteStream('./reviews.csv');
writeReviews.write('id,product_id,reviewTitle,reviewText,rating,bottomLine,votes_down,votes_up,verified_buyer,reviewTime,firstName,lastName,ageRange,place,skinType,skinShade\n', 'utf8');

// I plan on creating multiple csv files and uploading 3 csv segments containing reviews so that i don't exceed space.
// Which is why i'm creating startId to store the last id of previous csv.

function writeReviewsToCSV(writer, encoding, count, startId, callback) {
  let i = count;
  let id = startId;
  let reviewIndex = 0;

  // 6 products => 6 reviews each => ~36 reviews in total in csv file

  function write() {
    let reviewList = createReviews(2, 2);
    let ok = true;
    do {
      // if no reviews exist at index, change flag status.
      if (!reviewList[reviewIndex]) {
        console.log(`no index: ${reviewIndex} in reviewList`)
        break;
      }

      i -= 1;
      id += 1;

      // destructures all keys from list
      let { product_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime, firstName, lastName, ageRange, place, skinType, skinShade } = reviewList[reviewIndex];

      let _id = id;

      // data in csv was weird.
      const data = `${_id}, ${product_id}, ${reviewTitle}, ${JSON.stringify(reviewText)}, ${rating}, ${bottomLine}, ${votes_down}, ${votes_up}, ${verified_buyer}, ${reviewTime}, ${firstName}, ${lastName}, ${ageRange}, ${JSON.stringify(place)}, ${skinType}, ${skinShade}\n`;

      reviewIndex++;

      (i === 0) ?
        writer.write(data, encoding, callback) :
        ok = writer.write(data, encoding);

    } while (i > 0 && ok && reviewList[reviewIndex]);

    if (i > 0) { writer.once('drain', write); }
  }
  write()
  console.log('done');
}

writeReviewsToCSV(writeReviews, 'utf-8', 40, 0, () => {
  writeReviews.end();
})