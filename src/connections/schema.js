//This is the schema for the database.
let schema = {
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    address : {
        type : String,
    },
    city : {
        type : String,
    },
    state : {
        type : String,
    },
    country : {
        type : String,
    },
    zipcode : {
        type : Number,
    },
    time : {
        type : Date,
        default : new Date()
    }
};

module.exports = schema;