const connection = require('../connections/collection');

const ignore = {createdAt: 0, updatedAt: 0, time: 0, __v: 0};

let requests = {};

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
            return error.message
        })
    }).catch(error=>{
        return error.message
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
            return error.message
        })
    }).catch(error=>{
        return error.message
    })
}

requests.getUserWithId = (userId) => {
    return connection.getUserCollection().then((model) => {
        return model.find({_id: userId}).then((userInfo) => {
            console.log("in get use router >>> ", userInfo)
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