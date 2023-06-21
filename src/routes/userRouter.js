const express = require('express');
const router = express.Router();

const hash = require('../services/hash');
const userMethods = require('../models/user');

// get route to fetch all the users in database.
router.get('/get-all', (req, res)=>{
    userMethods.getallusers().then(data=>{
        // Here data is array of users Ex: [{}, {}, {}];
        if(data) {
            res.json({message: 'User database is empty', data: data})
        } else {
            res.json({message: 'User database is empty', data: []});
        }
    }).catch(err=>{
        res.json({message: err.message, data: []})
    })
})

// get router for fetching user data with user email
router.get('/get-user-with-email/:email', (req, res)=>{
    let userEmail = req.params.email;
    userMethods.getuserwithemail(userEmail).then(data=>{
        // Here data is array of single user data Ex: [{}]
        if(data){
            res.json({message: "User data found", user: true, data: data})
        } else {
            res.json({message: "Email address doesn't exist in database", user: false, data: []})
        }
    }).catch(err=>{
        res.json({message: err.message, user: false, data: []})
    })
})

// get router for fetching user data with user user id
router.get('/get-user-with-userId/:userId', (req, res)=>{
    let userId = req.params.userId;
    userMethods.getUserWithId(userId).then(data=>{
        // Here data is array of single user data Ex: [{}] or null
        if(data){
            res.json({message: "User data found", user: true, data: data})
        } else {
            res.json({message: "User not found", user: false, data: []})
        }
    }).catch(err=>{
        res.json({message: err.message, user: false, data: []})
    })
})

// get router to verify the user in the database
router.get('/verify-user/:email/:password', (req, res)=>{
    let userCredentials = {email: req.params.email, password: req.params.password};
    userMethods.getuserwithemail(userCredentials.email).then(data=>{
        // Here data is single user information in array Ex: [{}]
        if (data) {
            // compare password will verify the password
            hash.comparePassword(userCredentials.password, data[0].password).then((hashResponse)=>{
                // Here hashResponse is either true or false
                if(hashResponse) {
                    res.json({login : true, data : data[0], message: "User verified successfully"});
                }else {
                    res.json({message : "Password is wrong", login: false, data: []});
                }
            })
        } else {
            res.json({message : "User doesn't exist. Email address is wrong", login: false, data: []});
        }
    }).catch(err=>{
        res.json({message: err.message, login: false, data: []})
    })
})

// post request to insert the user in the data base
router.post('/insert-user', (req, res)=>{
    //userInfo will be in the form of object ex: {firstmame:'abc', lastName:'xyz'}
    let userInfo = req.body; 
    userMethods.insertUser(userInfo).then(data=>{
        //If insertion is successfull then data will be insertedobject in array form ex: [{firstmame:'abc', lastName:'xyz'}]
        //If insertion is not successful then data will be null or appropriate error
        if(data){
            res.json({message: "Account created successfully", inserted: true})
        } else {
            res.json({message: "User already exist with same email address", inserted: false})
        }
    }).catch(err=>{
        res.json({message: err.message, inserted: false})
    })
})

module.exports = router;