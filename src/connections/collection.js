const schema = require("./schema");
const mongoose = require("mongoose");
//Promises are a way of handling asynchronous operations in JavaScript,
//and by setting the Promise implementation to be global,
//it ensures that all Mongoose operations use the same Promise implementation throughout the application.
mongoose.Promise = global.Promise;

const userInfoSchema = mongoose.Schema(schema, {
  collection: "userInfo",
  timestamps: { createdAt: true, updatedAt: true },
});

collection = {};
const dbURL =
  "mongodb+srv://sandeepxsandy49:bYJd5mDVfrafxkpM@cluster0.uhoidoo.mongodb.net/dataDB?retryWrites=true&w=majority";

//Creating the connection
collection.getCollection = () => {
  return mongoose
    .connect(dbURL, { useNewUrlParser: true })
    .then((db) => {
      //Here we are returning the model which allows to querying and manipulating the collection.
      return db.model("userInfo", userInfoSchema);
    })
    .catch((error) => {
      console.log(error);
      return error.message;
    });
};

module.exports = collection;
