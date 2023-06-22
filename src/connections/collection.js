const schema = require("./schema");
const mongoose = require("mongoose");
//Promises are a way of handling asynchronous operations in JavaScript,
//and by setting the Promise implementation to be global,
//it ensures that all Mongoose operations use the same Promise implementation throughout the application.
mongoose.Promise = global.Promise;

// Creating a collection object which we will export.
collection = {};

// Getting database URL from environment file
const dbURL = process.env.DATABASE_URL;

//Creating the connection for userInfo collection
collection.getUserCollection = () => {
  return mongoose
    .connect(dbURL, { useNewUrlParser: true })
    .then((db) => {
      //Here we are returning the model which allows to querying and manipulating the collection.
      return db.model("userInfo", schema.userInfoSchema);
    })
    .catch((error) => {
      console.log(error.message)
      throw Error(error.message)
    });
};

//Creating the connection for productInfo collection.
collection.getProductCollection = () => {
  return mongoose
    .connect(dbURL, { useNewUrlParser: true })
    .then((db) => {
      //Here we are returning the model which allows to querying and manipulating the collection.
      return db.model("productInfo", schema.productInfoSchema);
    })
    .catch((error) => {
      console.log(error.message)
      throw Error(error.message)
    });
};

//Creating the connection for cartInfo collection.
collection.getCartCollection = () => {
  return mongoose
    .connect(dbURL, { useNewUrlParser: true })
    .then((db) => {
      //Here we are returning the model which allows to querying and manipulating the collection.
      return db.model("cartInfo", schema.cartSchema);
    })
    .catch((error) => {
      console.log(error.message)
      throw Error(error.message)
    });
};

module.exports = collection;
