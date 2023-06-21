const express = require('express');
const router = express.Router();

const postProductsMethod = require("../models/postProducts");

router.post('/', (req, res) => {
    postProductsMethod.setUpProductsDB().then((inserted) => {
        if(inserted){
            res.json({message:"Products DB set up success"})
        }else {
            res.json({message:"Products DB set up failed."})
        }
    }).catch((err)=>{
        res.send(err.message)
    })
})

module.exports = router;