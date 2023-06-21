const express = require("express");
const router = express.Router();

const cartMethods = require("../models/cart");

// get request to fetch all the carts
router.get("/get-all", (req, res) => {
  cartMethods
    .getAllCarts()
    .then((data) => {
      // Here data is array of cart objects Ex: [{}, {}...] or null
      if (data) {
        res.json({
          data: data,
          message: "Successfully retrived all the carts",
        });
      } else {
        res.json({ data: [], message: "Carts database is empty" });
      }
    })
    .catch((err) => {
      res.send({ message: err.message, data: [] });
    });
});

// get request to fetch the cart with cart id
router.get("/cart/:cartId", (req, res) => {
  const cartId = req.params.cartId;
  cartMethods
    .getCartWithCartId(cartId)
    .then((data) => {
      // Here data is array of cart object Ex: [{}] or null
      if (data) {
        res.json({ data: data, message: "Cart found" });
      } else {
        res.json({ data: [], message: "Cart not found" });
      }
    })
    .catch((err) => {
      res.send({ message: err.message, data: [] });
    });
});

// get request to fetch cart based on user Id
router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  cartMethods
    .getCartWithUserId(userId)
    .then((data) => {
      // Here data is array of cart object Ex: [{}] or null
      if (data) {
        res.json({ data: data, message: "User cart found" });
      } else {
        res.json({ data: [], message: "User cart is Empty" });
      }
    })
    .catch((err) => {
      res.send({ message: err.message, data: [] });
    });
});

// post request to update the cart into cart database
router.post("/", (req, res) => {
  const cartInfo = req.body;
  cartMethods
    .updateCart(cartInfo)
    .then((cartUpdated) => {
      if (cartUpdated) {
        res.json({ cartUpdated: true, message: "Cart Upated successfully" });
      } else {
        res.json({ cartUpdated: false, message: "Cart Upate failed" });
      }
    })
    .catch((err) => {
      res.send({ message: err.message, cartUpdated: false });
    });
});

router.post("/change-quantity", (req, res) => {
  const cartInfo = req.body;
  cartMethods
    .changeQuantityofProductInCart(cartInfo)
    .then((cartUpdated) => {
      if (cartUpdated) {
        res.json({ cartUpdated: true, message: "Cart Upated successfully" });
      } else {
        res.json({ cartUpdated: false, message: "Cart Upate failed" });
      }
    })
    .catch((err) => {
      res.send({ message: err.message, cartUpdated: false });
    });
});

// post request to remvoe product form the user cart
router.post("/remove-product-from-cart", (req, res) => {
  const obj = req.body;
  cartMethods.removeProductFromUserCart(obj).then((cartUpdated)=>{
    if (cartUpdated) {
      res.json({ cartUpdated: true, message: "Product removed from cart" });
    } else {
      res.json({ cartUpdated: false, message: "Failed to remove product form cart" });
    }
  }).catch((err) => {
    res.send({ message: err.message, cartUpdated: false });
  });
})

module.exports = router;
