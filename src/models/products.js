const connection = require("../connections/collection");
const productsInfo = require("./products-data");

let requests = {};

// Function to fetch all the products present in database
requests.getAllProducts = () => {
  return connection
    .getProductCollection()
    .then((model) => {
      return model
        .find({})
        .then((allProducts) => {
          // Here allProducts is product objects in array Ex: [{}, {}, {}, {}....]
          if (allProducts.length > 0) {
            return allProducts;
          } else {
            return null;
          }
        })
        .catch((err) => {
          throw Error(err.message)
        });
    })
    .catch((err) => {
      throw Error(err.message)
    });
};

// Function to search products database with product Id
requests.getProductWithId = (productId) => {
  return connection
    .getProductCollection()
    .then((model) => {
      return model
        .find({ _id: productId })
        .then((productData) => {
          // Here productData is product object in array Ex: [{}]
          if (productData.length > 0) {
            return productData;
          } else {
            return null;
          }
        })
        .catch((err) => {
          throw Error(err.message)
        });
    })
    .catch((err) => {
      throw Error(err.message)
    });
};

// Funtion to serach the database with product name
requests.getProductsWithName = (productName) => {
  return connection
    .getProductCollection()
    .then((model) => {
      return model
        .find({ title: { $regex: productName, $options: 'i' } })
        .then((productData) => {
          // Here productData is array of matched product objects 
          // Ex: [{}, {}] or [] based on whether product is present in database or not
          if (productData.length > 0) {
            return productData;
          } else {
            return null;
          }
        })
        .catch((err) => {
          throw Error(err.message)
        });
    })
    .catch((err) => {
      throw Error(err.message)
    });
};

// Funtion to set up the products database
requests.setUpProductsDB = () => {
  return connection
    .getProductCollection()
    .then((model) => {
      return model
        .insertMany(productsInfo)
        .then((inserted) => {
          // Here inserted is array of product objects Ex: [{}, {}, {}]
          if (inserted.length > 0) {
            return inserted;
          } else {
            return null;
          }
        })
        .catch((err) => {
          throw Error(err.message)
        });
    })
    .catch((err) => {
      throw Error(err.message)
    });
};

module.exports = requests;
