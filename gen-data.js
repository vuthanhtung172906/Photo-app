const { fake } = require("faker");
const faker = require("faker");
const fs = require("fs");
faker.locale = "vi";

const randomCategoryList = (number) => {
  const categories = [];
  if (number <= 0) return [];
  Array.from(new Array(number)).forEach(() => {
    let category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    while (categories.find((value) => value.name === category.name)) {
      category = {
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
        createAt: Date.now(),
        updateAt: Date.now(),
      };
    }

    categories.push(category);
  });

  return categories;
};
const randomProduct = (categories, number) => {
  if (number <= 0) return [];
  const products = [];
  for (category of categories) {
    Array.from(new Array(number)).forEach(() => {
      const product = {
        catetoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        createAt: Date.now(),
        updateAt: Date.now(),
        thumnailUrl: faker.image.imageUrl(400, 400),
      };
      products.push(product);
    });
  }
  return products;
};
/// IIFE  - IFFE
(() => {
  // prepare db object
  const categories = randomCategoryList(10);
  const products = randomProduct(categories, 5);
  const db = {
    categories: categories,
    products: products,
    profile: {
      name: "Po",
    },
  };
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Genaration data Success ");
  });
})();
