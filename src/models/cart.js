const connection = require("../connections/collection");
const userMethods = require("./user");

let requests = {};

// Function to fetch all the carts 
requests.getAllCarts = () => {
    return connection
        .getCartCollection()
        .then((model) => {
            return model
                .find({})
                .then((allCarts) => {
                    // Here allCarts is array of cart objects Ex: [{},{}....]
                    if (allCarts.length > 0) {
                        return allCarts;
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

// Function to get cart details with cart Id
requests.getCartWithCartId = (cartId) => {
    return connection
        .getCartCollection()
        .then((model) => {
            return model
                .find({ _id: cartId })
                .then((cartData) => {
                    // Here cartData is array of cart object Ex: [{}] 
                    if (cartData.length > 0) {
                        return cartData;
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

// Function to get cart with user Id
requests.getCartWithUserId = (userId) => {
    return connection.getCartCollection().then((model) => {
        return model.find({ userId: userId }).then((cartData) => {
            // Here in cartData we will get cart data as object in array
            // Ex: [{}]
            if (cartData.length > 0) {
                return cartData
            } else {
                return null
            }
        }).catch((err) => {
            throw Error(err.message)
        });
    }).catch((err) => {
        throw Error(err.message)
    });
}

// Function to insert new cart to database
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
                    throw Error(err.message)
                });
        })
        .catch((err) => {
            throw Error(err.message)
        });
};

// Function to set new array to to cart.
// Ex: {cartId: "", userId: "", cart: newArr}
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
                    throw Error(err.message)
                });
        })
        .catch((err) => {
            throw Error(err.message)
        });
};

// Function to push the product into cart
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
                    if (cartUpdated) {
                        return true;
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

// Function to update the cart based on different parameters.
requests.updateCart = (cartInfo) => {
    // Checking whether user cart already present in the database
    return requests
        .getCartWithUserId(cartInfo.userId)
        .then((userCart) => {
            if (userCart) {
                // Here userCart is cart object in array Ex: [{}]
                let userCartProducts = userCart[0].cart;
                // checking whether the product is already present in user cart or not
                let isProductInCart = userCartProducts.find(
                    (product) => product.productId === cartInfo.productId
                );
                if (isProductInCart) {
                    // Here product is already present in the user cart
                    // So we are updating the product quantity here
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
                    // Here product is not present in user cart
                    // So we are pushing the new product into the cart
                    return requests.pushNewItemIntoCartArr(cartInfo);
                }
            } else {
                return userMethods
                    .getUserWithId(cartInfo.userId)
                    .then((userInfoInUsers) => {
                        // Here userInfoInUsers is user object in array Ex: [{}] or null
                        if (userInfoInUsers.length > 0) {
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
                        throw Error(err.message)
                    });
            }
        })
        .catch((err) => {
            throw Error(err.message)
        });
};

// Function to change the quantity of product from the user cart
requests.changeQuantityofProductInCart = (cartInfo) => {
    return requests.getCartWithUserId(cartInfo.userId).then((userCartInfo) => {
        if (userCartInfo) {
            let cartProducts = userCartInfo[0].cart;
            let newCartProducts = cartProducts.map((item) => {
                if (item.productId === cartInfo.productId) {
                    item.quantity = cartInfo.quantity
                }
                return item
            })
            return requests.setNewArrayToCart(cartInfo.userId, newCartProducts)
        } else {
            throw Error("User cart not found")
        }
    }).catch((err) => {
        throw Error(err.message)
    });
}

// Function to remove product from the user cart
requests.removeProductFromUserCart = (obj) => {
    return connection.getCartCollection().then((model) => {
        return model.updateOne({userId: obj.userId}, { $pull : {cart: { productId: obj.productId}}}).then((cartUpdated)=>{
            // Here in cartUpdated we will get the information in object format EX: {}
                    // object contains matchedCount, modifiedCount etc
            if(cartUpdated.matchedCount > 0 && cartUpdated.modifiedCount > 0){
                return true
            }else{
                return null
            }
        }).catch((err) => {
            throw Error(err.message)
        });
    }).catch((err) => {
        throw Error(err.message)
    });
}

module.exports = requests;
