const express = require("express");
const router = express.Router();

const getCartMethods = require("../models/getCart");

router.get("/", (req, res) => {
    getCartMethods
    .getAllCarts()
    .then((data) => {
      if (data.length > 0) {
        res.json(data);
      } else {
        res.json({ data: [], message: "Carts database is empty" });
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/:cartId", (req, res) => {
  const cartId = req.params.cartId;
  getCartMethods
    .getCartWithCartId(cartId)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.json({ data: [], message: "Cart not found" });
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  getCartMethods.getCartWithUserId(userId).then((data) => {
    if(data){
      res.json(data)
    }else{
      res.json({ data: [], message: "Cart is Empty"});
    }
  }).catch((err) => {
    res.send(err.message);
  });
})

module.exports = router;
