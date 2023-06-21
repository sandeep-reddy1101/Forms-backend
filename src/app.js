require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const postRouter = require('./routes/postUserRouter');
const getRouter = require('./routes/getUserRouter');
const stripeRouter = require('./payments/stripe');
const getProductRouter = require('./routes/getProductRouter');
const postProductRouter = require('./routes/postProductRouter');
const getCartRouter = require('./routes/getCartRouter');
const postCartRouter = require('./routes/postCartRouter');

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/', (req, res)=>{
    res.json({message: "Hello world!!!"})
})
app.use('/get', getRouter);
app.use('/post', postRouter);
app.use('/products', getProductRouter);
app.use('/carts', getCartRouter);
app.use('/carts/post', postCartRouter);
app.use('/create-checkout-session', stripeRouter);
app.use('/setProductsDB', postProductRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})