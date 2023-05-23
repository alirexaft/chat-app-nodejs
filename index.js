const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const routes = require('./modules/routes');

const app = express();

app.use(cors());
app.use(express.json())

require("dotenv").config()


dotenv.config({path: path.join(__dirname, '..', '.env')});

app.use(routes);


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( () => {
    console.log("Database Connected!")
}).catch((err) => {
    console.log(`connect to database error: ${err}`);
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
})



