const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const postRouter = require('./routes/postRouter');
const getRouter = require('./routes/getRouter');

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/', (req, res)=>{
    res.json({message: "Hello world!!!"})
})
app.use('/get', getRouter);
app.use('/post', postRouter);

const port = 4200;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})