const fs = require('fs');

const writeProducts = fs.createWriteStream('./products.csv');
writeProducts.write('id,productName\n', 'utf8');

const randomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

function writeProductsToCSV(writer, encoding, count, callback) {
  let i = count;
  let id = 0;

  const productTitles = ['Lipstick', 'Lip Gloss', 'Eye Lashes', 'Lotion', 'Nail Polish', 'Concealer', 'Eyeliner', 'Brushes', 'Blender', 'Lash Stick'];
  const colorChoice = ['Pink', 'Hot Pink', 'Blue', 'Purple', 'Green', 'Black', 'Red', 'Indigo', 'Yellow', 'Maroon'];
  const adjectiveList = ['Cool', 'Pretty', 'Sexy', 'Beautiful'];

  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      let color = randomElement(colorChoice);
      let product = randomElement(productTitles);
      let adjective = randomElement(adjectiveList);
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

writeProductsToCSV(writeProducts, 'utf-8', 10000000, () => {
  writeProducts.end();
})

const insertProducts = (productCount) => {

  const productTitles = ['Lipstick', 'Lip Gloss', 'Eye Lashes', 'Lotion', 'Nail Polish', 'Concealer', 'Eyeliner', 'Brushes', 'Blender', 'Lash Stick'];
  const colorChoice = ['Pink', 'Hot Pink', 'Blue', 'Purple', 'Green', 'Black', 'Red', 'Indigo', 'Yellow', 'Maroon'];
  const adjectiveList = ['Cool', 'Pretty', 'Sexy', 'Beautiful'];

  let productsArr = [];
  for (let i = 0; i < productCount; i++) {

    productsArr.push({
      id: i,
      productName: `${adjective} ${color} ${product}`
    })
  }
  return productsArr;
}

// console.log(insertProducts(100));

module.exports = insertProducts;