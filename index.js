const dotenv = require('dotenv').config();
const app = require('express')();
const express = require('express');
const server = require('http').Server(app);
const PORT = process.env.PORT;
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

const cors = require('cors');
const cookieParser = require('cookie-parser');

const Router = require('./routers/index')
const userRouter = require('./routers/UserRouters')
const chatRouter = require('./routers/ChatRouters')
const socketConnections = require('./controllers/socketController.js');

app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use('/', Router);
app.use('/user', userRouter);
app.use('/chats', chatRouter)

socketConnections(io);

server.listen(PORT, () => console.log('server work'));