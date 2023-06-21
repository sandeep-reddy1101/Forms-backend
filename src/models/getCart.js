const connection = require("../connections/collection");

let requests = {};

requests.getAllCarts = () => {
  return connection
    .getCartCollection()
    .then((model) => {
      return model
        .find({})
        .then((allCarts) => {
          if (allCarts && allCarts.length > 0) {
            return allCarts;
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

requests.getCartWithCartId = (cartId) => {
  return connection
    .getCartCollection()
    .then((model) => {
      return model
        .find({ _id: cartId })
        .then((cartData) => {
          if (allCarts && cartData.length > 0) {
            return cartData;
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

requests.getCartWithUserId = (userId) => {
  return connection.getCartCollection().then((model) => {
    return model.find({userId: userId}).then((cartData)=>{
      // Here in cartData we will get cart data as object in array
      // Ex: [{}]
      if(cartData.length > 0) {
        return cartData
      }else {
        return null
      }
    }).catch((error) => {
      return error.message;
    });
  }).catch((error) => {
    return error.message;
  });
}

module.exports = requests;
