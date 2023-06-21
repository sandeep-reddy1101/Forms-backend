const connection = require('../connections/collection');
const hash = require('../services/hash');

const ignore = {createdAt: 0, updatedAt: 0, time: 0, __v: 0};

let requests = {};

//Function for inserting the user into the database.
requests.insertUser = (userInfo)=>{
    return connection.getUserCollection().then(model=>{
        //Initially we are checking whether the user already exist in the database or not.
        return requests.getuserwithemail(userInfo.email).then(userDetected=>{
            //Here if user doesn't exists in database then userDetected is null
            if (userDetected){
                return null //we will return null because user already exist in database
            } else {
                return hash.hashPassword(userInfo.password).then(hashedPassword=>{
                    userInfo.password = hashedPassword;
                    return model.insertMany(userInfo).then(inserted=>{
                        // Here inserted is user data in the array Ex: [{}]
                        console.log(inserted)
                        if(inserted.length > 0){
                            return inserted
                        }
                    }).catch(error=>{
                        throw Error(error.message)
                    })
                }).catch(error=>{
                    throw Error(error.message)
                })
            }
        }).catch(err=>{
            throw Error(err.message)
        })
    }).catch(err=>{
        throw Error(err.message)
    })
}

//Function to get all the users present in database.
requests.getallusers = ()=>{
    return connection.getUserCollection().then(model=>{
        return model.find({}, ignore).then(allUsers=>{
            //allUsers will be an array with user objects in it ex: [{},{},{}].
            if(allUsers.length > 0){
                return allUsers
            } else {
                return null //if database is empty return null
            }
        }).catch(error=>{
            throw Error(error.message);
        })
    }).catch(error=>{
        throw Error(error.message);
    })
}

//Function which finds and returns the user details with the help of user email address.
requests.getuserwithemail = (userMail)=>{
    return connection.getUserCollection().then(model=>{
        return model.find({email: userMail}, ignore).then(userdata=>{
            //allUsers will be an array with user object in it ex: [{}].
            if (userdata.length > 0){
                return userdata
            } else {
                return null //return null if email address is not found
            }
        }).catch(error=>{
            throw Error(error.message)
        })
    }).catch(error=>{
        throw Error(error.message)
    })
}

// Funtion to fetch the user with user id
requests.getUserWithId = (userId) => {
    return connection.getUserCollection().then((model) => {
        return model.find({_id: userId}).then((userInfo) => {
            // Here userInfo is user object in array
            if(userInfo.length > 0){
                return userInfo
            }else{
                return null
            }
        }).catch(error=>{
            throw Error(error.message)
        })
    }).catch(error=>{
        throw Error(error.message)
    })
}

module.exports = requests;