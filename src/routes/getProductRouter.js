const express = require("express");
const router = express.Router();

const getProductsMethod = require("../models/getProducts");

router.get("/", (req, res) => {
  getProductsMethod
    .getAllProducts()
    .then((data) => {
      if (data.length > 0) {
        res.json(data);
      } else {
        res.json({ data: [], message: "Products database is empty" });
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/:productId", (req, res) => {
  const productId = req.params.productId;
  getProductsMethod
    .getProductWithId(productId)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.json({ data: [], message: "Product not found" });
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/search/:productName", (req, res) => {
  const productName = req.params.productName;
  getProductsMethod
    .getProductsWithName(productName)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.json({ data: [], message: "Sorry!!! No product found" });
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;
