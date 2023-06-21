const express = require("express");
const router = express.Router();

const productsMethod = require("../models/products");

// post request to setup database
router.post('/setup-db', (req, res) => {
  productsMethod.setUpProductsDB().then((inserted) => {
    if (inserted) {
      res.json({ message: "Products DB set up success" })
    } else {
      res.json({ message: "Products DB set up failed." })
    }
  }).catch((err) => {
    res.send({ message: err.message })
  })
})

// get request to fetch all the products in the database.
router.get("/get-all", (req, res) => {
  productsMethod
    .getAllProducts()
    .then((data) => {
      // Here data is array of objects Ex: [{}, {}, {}] or null
      if (data) {
        res.json({ data: data, message: "All Products in database retrieved successfully" });
      } else {
        res.json({ data: [], message: "Products database is empty" });
      }
    })
    .catch((err) => {
      res.send({message: err.message, data: []});
    });
});

// get request to fetch the product from the product database based on productId
router.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;
  productsMethod
    .getProductWithId(productId)
    .then((data) => {
      // Here data is product object in array Ex: [{}] or null
      if (data) {
        res.json({ data: data, message: "Product found" });
      } else {
        res.json({ data: [], message: "Product not found" });
      }
    })
    .catch((err) => {
      res.send({message: err.message, data: []});
    });
});

// get request to search product with product name
router.get("/search/:productName", (req, res) => {
  const productName = req.params.productName;
  productsMethod
    .getProductsWithName(productName)
    .then((data) => {
      // Here data is products objects in array Ex: [{},{},{}...] or null
      if (data) {
        res.json({ data: data, message: "Searched products" });
      } else {
        res.json({ data: [], message: "Sorry!!! No product found" });
      }
    })
    .catch((err) => {
      res.send({message: err.message, data: []});
    });
});

module.exports = router;
