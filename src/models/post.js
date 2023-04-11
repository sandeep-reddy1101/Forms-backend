const connection = require('../connections/collection');
const getMethods = require('./get');
const hash = require('../services/hash');

let requests = {};

//Function for inserting the user into the database.
requests.insertUser = (userInfo)=>{
    return connection.getCollection().then(model=>{
        //Initially we are checking whether the user already exist in the database or not.
        return getMethods.getuserwithemail(userInfo.email).then(userDetected=>{
            //Here if user doesn't exists in database then userDetected is null
            if (userDetected){
                return null //we will return null because user already exist in database
            } else {
                return hash.hashPassword(userInfo.password).then(hashedPassword=>{
                    userInfo.password = hashedPassword;
                    return model.insertMany(userInfo).then(inserted=>{
                        if(inserted.length > 0){
                            return inserted
                        }
                    }).catch(error=>{
                        console.log(error)
                        return error
                    })
                })
            }
        }).catch(err=>{
            console.log(err)
            return err.message
        })
    }).catch(err=>{
        console.log(err)
        return err.message
    })
}

module.exports = requests;