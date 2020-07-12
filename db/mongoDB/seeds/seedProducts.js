const fs = require('fs');

const writeProducts = fs.createWriteStream('products.csv');
writeProducts.write('id,productName\n', 'utf8');

const randomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const insertProducts = (productCount) => {

  const productTitles = ['Lipstick', 'Lip Gloss', 'Eye Lashes', 'Lotion', 'Nail Polish', 'Concealer', 'Eyeliner', 'Brushes', 'Blender', 'Lash Stick'];
  const colorChoice = ['Pink', 'Hot Pink', 'Blue', 'Purple', 'Green', 'Black', 'Red', 'Indigo', 'Yellow', 'Maroon'];
  const adjectiveList = ['Cool', 'Pretty', 'Sexy', 'Beautiful'];

  let productsArr = [];
  for (let i = 0; i < productCount; i++) {
    let color = randomElement(colorChoice);
    let product = randomElement(productTitles);
    let adjective = randomElement(adjectiveList);

    productsArr.push({
      id: i,
      productName: `${adjective} ${color} ${product}`
    })
  }
  return productsArr;
}

// console.log(insertProducts(100));

module.exports = insertProducts;

function writeProductsToCSV(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const username = faker.internet.userName();
      const avatar = faker.image.avatar();
      const data = `${id},${username},${avatar}\n`;
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
  write()
}