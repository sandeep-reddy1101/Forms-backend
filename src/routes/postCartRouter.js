const postCartMethods = require("../models/postCart");
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const cartInfo = req.body;
    postCartMethods.updateCart(cartInfo).then((cartUpdated) => {
        console.log("is cartd updated >>> ", cartUpdated)
        if(cartUpdated) {
            res.json({cartUpdated: true, message: "Cart Upated successfully"})
        }else {
            res.json({cartUpdated: false, message: "Cart Upate failed"})
        }
    }).catch((err)=>{
        console.log(err);
        res.send(err.message)
    })
})

module.exports = router;