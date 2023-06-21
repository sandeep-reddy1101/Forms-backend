require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const userRouter = require("./routes/userRouter");
const stripeRouter = require('./payments/stripe');
const productsRouter = require("./routes/productsRouter");
const cartRouter = require('./routes/cartRouter');

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/', (req, res)=>{
    res.json({message: "Hello world!!!"})
})
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/carts', cartRouter);
app.use('/create-checkout-session', stripeRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})