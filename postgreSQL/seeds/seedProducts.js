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

console.log(insertProducts(100));