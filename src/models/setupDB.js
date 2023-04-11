let collection = require('../connections/collection');
let dummyUser = require('./dummyuser');

initializingDB = {};

initializingDB.setupDB = ()=>{
    return collection.getCollection().then(model=>{
        return model.deleteMany().then(emptyDB=>{
            return model.insertMany(dummyUser).then(inserted=>{
                if (inserted) {
                    return inserted
                }
            })
        })
    })
}

module.exports = initializingDB;