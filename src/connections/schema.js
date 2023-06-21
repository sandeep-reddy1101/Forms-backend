const mongoose = require("mongoose");
//Promises are a way of handling asynchronous operations in JavaScript,
//and by setting the Promise implementation to be global,
//it ensures that all Mongoose operations use the same Promise implementation throughout the application.
mongoose.Promise = global.Promise;

let schema = {};

const productRatingSchema = mongoose.Schema({
  rate: {
    type: Number,
    required: true,
    default: 0,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const userAddressSchema = mongoose.Schema({
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  zipcode: {
    type: Number,
    default: 12345,
  },
});

const userCartShema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

schema.userInfoSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: userAddressSchema,
    time: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "userInfo",
    timestamps: { createdAt: true, updatedAt: true },
  }
);

schema.productInfoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: "others",
    },
    image: {
      type: String,
      required: true,
    },
    rating: productRatingSchema,
  },
  {
    collection: "productInfo",
    timestamps: { createdAt: true, updatedAt: true },
  }
);

schema.cartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    cart: [userCartShema],
  },
  {
    collection: "cartInfo",
    timestamps: { createdAt: true, updatedAt: true },
  }
);

module.exports = schema;
