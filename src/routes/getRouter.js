const express = require('express');
const router = express.Router();

const hash = require('../services/hash');
const getMethods = require('../models/get');

//
router.get('/getAllUsers', (req, res)=>{
    getMethods.getallusers().then(data=>{
        if(data) {
            res.json(data)
        } else {
            res.json({message: 'Database is empty', data: []});
        }
    }).catch(err=>{
        res.send(err.message)
    })
})

router.get('/getUserWithEmail/:email', (req, res)=>{
    let userEmail = req.params.email;
    getMethods.getuserwithemail(userEmail).then(data=>{
        if(data){
            res.json(data)
        } else {
            res.json({message: "Email address doesn't exist in database", user: false})
        }
    }).catch(err=>{
        res.send(err.message)
    })
})

router.get('/verifyUser/:email/:password', (req, res)=>{
    let userCredentials = {email: req.params.email, password: req.params.password};
    getMethods.getuserwithemail(userCredentials.email).then(data=>{
        if (data) {
            if (hash.comparePassword(userCredentials.password, data[0].password)) {
                res.json({login : true});
            } else {
                res.json({message : "Password is wrong", login: false});
            }
        } else {
            res.json({message : "User doesn't exist. Email address is wrong", login: false});
        }
    }).catch(err=>{
        res.send(err.message)
    })
})

module.exports = router;