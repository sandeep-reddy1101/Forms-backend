const stripe = require("stripe")(process.env.STRIPE_API_SECRET_KEY);
const express = require("express");
const router = express.Router();
const productsMethod = require("../models/products");

// This funciton will take items which are products in cart Ex: [{productId:'',quantity:2},{productId:'',quantity:2}..]
// It will iterate over that array and retreive the product information based on productId and create lineItem for stripe
// We will get pending promises in array 
// To resolve those promises we will use promise.all 
const getLineItems = (items) => {
  return Promise.all(items.map((item) => {
    return productsMethod.getProductWithId(item.productId).then((productInfo) => {
      const lineItem = {
        price_data: {
          currency: "usd",
          product_data: {
            name: productInfo[0].title,
          },
          unit_amount: productInfo[0].price * 100,
        },
        quantity: item.quantity,
      };
      return lineItem;
    }).catch(err => {
      console.log(err)
    })
  })).then((lineItemsArr) => {
    return lineItemsArr
  })
};

// post request which will create payment link for the user
router.post("/", (req, res) => {
  const successUrl = req.body.successUrl;
  const errorUrl = req.body.errorUrl;
  try {
    const productsToBuy = JSON.parse(req.body.items);
    getLineItems(productsToBuy).then((lineItemsForPayment) => {
      stripe.checkout.sessions.create({
        line_items: lineItemsForPayment,
        mode: "payment",
        success_url: successUrl,
        cancel_url: errorUrl,
      }).then((session) => {
        console.log(session)
        res.json({ url: session.url })
      }).catch(err => {
        res.json({ error: err.message });
      })
    }).catch(err => {
      res.json({ error: err.message });
    })
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
