const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http')
const routes = require('./modules/routes');
const {Server} = require('socket.io');
const app = express();

app.use(cors());
app.use(express.json())

require("dotenv").config()


dotenv.config({path: path.join(__dirname, '..', '.env')});

app.use(routes);

const server = http.createServer(app)


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT"]
    },
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("send_message", (data) => {
        console.log(data);
        socket.broadcast.emit('receive_message', data)
    })
})

server.listen(process.env.PORT, () => {
    console.log(`Server is Running on Port: ${process.env.PORT}`)
})

mongoose.connect("mongodb://127.0.0.1/chat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( () => {
    console.log("Database Connected!")
}).catch((err) => {
    console.log(`connect to database error: ${err}`);
})


