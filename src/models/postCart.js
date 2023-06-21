const connection = require("../connections/collection");
const getCartMethods = require("./getCart");
const getUserMethods = require("./getUser");

let requests = {};

requests.insertNewCart = (cart) => {
  return connection
    .getCartCollection()
    .then((model) => {
      return model
        .insertMany(cart)
        .then((cartInserted) => {
          // Here in cartInserted we will get the inserted document in array
          // Ex: [{}]
          if (cartInserted.length > 0) {
            return true;
          } else {
            return null;
          }
        })
        .catch((err) => {
          console.log(err);
          return err.message;
        });
    })
    .catch((err) => {
      console.log(err);
      return err.message;
    });
};

requests.setNewArrayToCart = (userId, newArr) => {
  return connection
    .getCartCollection()
    .then((model) => {
      return model
        .updateOne({ userId: userId }, { $set: { cart: newArr } })
        .then((cartUpdated) => {
          // Here in cartUpdated we will get the information in object format EX: {}
          // object contains matchedCount, modifiedCount etc
          if (
            cartUpdated.matchedCount === 1 &&
            cartUpdated.modifiedCount === 1
          ) {
            return true;
          } else {
            return null;
          }
        })
        .catch((err) => {
          console.log(err);
          return err.message;
        });
    })
    .catch((err) => {
      console.log(err);
      return err.message;
    });
};

requests.pushNewItemIntoCartArr = (cartInfo) => {
  return connection
    .getCartCollection()
    .then((model) => {
      return model
        .findOneAndUpdate(
          { userId: cartInfo.userId },
          {
            $push: {
              cart: {
                productId: cartInfo.productId,
                quantity: cartInfo.quantity,
              },
            },
          },
          { new: true }
        )
        .then((cartUpdated) => {
          // Here in cartUpdated we will the cart details in object {}
          console.log("push the product into cart >>> ", cartUpdated);
          if (cartUpdated) {
            return true;
          } else {
            return null;
          }
        })
        .catch((err) => {
          console.log(err);
          return err.message;
        });
    })
    .catch((err) => {
      console.log(err);
      return err.message;
    });
};

requests.updateCart = (cartInfo) => {
  return getCartMethods
    .getCartWithUserId(cartInfo.userId)
    .then((userCart) => {
      console.log("get cart with user id >>> ", userCart);
      if (userCart) {
        let userCartProducts = userCart[0].cart;
        let isProductInCart = userCartProducts.find(
          (product) => product.productId === cartInfo.productId
        );
        if (isProductInCart) {
          let newUserCartProducts = userCartProducts.map((item) => {
            if (item.productId === cartInfo.productId) {
              let newQuantity =
                parseInt(item.quantity) + parseInt(cartInfo.quantity);
              item.quantity = newQuantity;
            }
            return item;
          });
          return requests.setNewArrayToCart(
            cartInfo.userId,
            newUserCartProducts
          );
        } else {
          return requests.pushNewItemIntoCartArr(cartInfo);
        }
      } else {
        return getUserMethods
          .getUserWithId(cartInfo.userId)
          .then((userInfoInUsers) => {
            console.log("is user in user database >>> ", userInfoInUsers)
            if (userInfoInUsers) {
              const newCart = {
                userId: cartInfo.userId,
                cart: [
                  {
                    productId: cartInfo.productId,
                    quantity: cartInfo.quantity,
                  },
                ],
              };
              return requests.insertNewCart(newCart);
            } else {
              throw Error("User doesn't exist");
            }
          })
          .catch((err) => {
            console.log(err);
            throw Error(err.message)
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return err.message;
    });
};

module.exports = requests;
