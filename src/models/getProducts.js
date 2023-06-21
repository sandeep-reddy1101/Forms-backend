const connection = require("../connections/collection");

let requests = {};

requests.getAllProducts = () => {
  return connection
    .getProductCollection()
    .then((model) => {
      return model
        .find({})
        .then((allProducts) => {
          if (allProducts && allProducts.length > 0) {
            return allProducts;
          } else {
            return null;
          }
        })
        .catch((error) => {
          return error.message;
        });
    })
    .catch((error) => {
      return error.message;
    });
};

requests.getProductWithId = (productId) => {
  return connection
    .getProductCollection()
    .then((model) => {
      return model
        .find({ _id: productId })
        .then((productData) => {
          if (productData && productData.length > 0) {
            return productData;
          } else {
            return null;
          }
        })
        .catch((error) => {
          return error.message;
        });
    })
    .catch((error) => {
      return error.message;
    });
};

requests.getProductsWithName = (productName) => {
  return connection
    .getProductCollection()
    .then((model) => {
      return model
        .find({ title: { $regex: productName, $options: 'i' } })
        .then((productData) => {
          if (productData.length) {
            return productData;
          } else {
            return null;
          }
        })
        .catch((error) => {
          return error.message;
        });
    })
    .catch((error) => {
      return error.message;
    });
};

module.exports = requests;
