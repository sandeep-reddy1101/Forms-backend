const postMethod = require('../models/postUser');

const express = require('express');
const router = express.Router();

router.post('/insertUser', (req, res)=>{
    //userInfo will be in the form of object ex: {firstmame:'abc', lastName:'xyz'}
    let userInfo = req.body; 
    postMethod.insertUser(userInfo).then(data=>{
        //If insertion is successfull then data will be insertedobject in array form ex: [{firstmame:'abc', lastName:'xyz'}]
        //If insertion is not successful then data will be null or appropriate error
        if(data){
            res.json({message: "Account created successfully", inserted: true})
        } else {
            res.json({message: "User already exist with same email address", inserted: false})
        }
    }).catch(err=>{
        res.send(err.message)
    })
})



module.exports = router;