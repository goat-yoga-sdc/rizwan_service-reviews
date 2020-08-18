const fs = require('fs');
const { randomElement } = require('./reviewsGenerator.js');

const writeProducts = fs.createWriteStream('./products.csv');
writeProducts.write('id,productName\n', 'utf8');

const writeProductsToCSV = (writer, encoding, count, callback) => {
  let i = count;
  let id = 0;

  // list used to create product name
  const adjectiveList = ['Cool', 'Pretty', 'Sexy', 'Beautiful'];
  const colorChoice = ['Pink', 'Hot Pink', 'Blue', 'Purple', 'Green', 'Black', 'Red', 'Indigo', 'Yellow', 'Maroon'];
  const productTitles = ['Lipstick', 'Lip Gloss', 'Eye Lashes', 'Lotion', 'Nail Polish', 'Concealer', 'Eyeliner', 'Brushes', 'Blender', 'Lash Stick'];

  const write = () => {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      let adjective = randomElement(adjectiveList);
      let color = randomElement(colorChoice);
      let product = randomElement(productTitles);

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
  };
  write();
  console.log('done');
};

writeProductsToCSV(writeProducts, 'utf-8', 10000005, () => {
  writeProducts.end();
});