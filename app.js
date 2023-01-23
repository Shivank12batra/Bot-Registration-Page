require('dotenv').config();
require('express-async-errors');
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');


const port = process.env.PORT || 5000;

const express = require('express');
const app = express();

app.use(express.static('./public'));
app.use(express.json());

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening at ${port}`))
    } catch(err) {
        console.log(err)
    }
} 

start();