const dotenv = require('dotenv').config();
const app = require('express')();
const express = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

// const io = require('socket.io').listen(server)

const cors = require('cors');
const cookieParser = require('cookie-parser');

const Router = require('./routers/index')
const userRouter = require('./routers/UserRouters')
const chatRouter = require('./routers/ChatRouters')
const MessageController = require('./controllers/message-controller.js')

const PORT = 8081;

app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use('/', Router);
app.use('/user', userRouter);
app.use('/chats', chatRouter)

const connections = [];

io.sockets.on('connection', function (socket) {
  console.log('connection::', socket.id)

  connections.push(socket);

  socket.on('disconnect', function (data) {
    console.log('disconnection')
    connections.splice(connections.indexOf(socket), 1)
  })
  socket.on('send message', async (data) => {
    const message = await MessageController.writeMessage(data)

    io.sockets.emit('add message', { msg: message });
  });

  socket.on('get_messages', async (chatId, startIndex, count, callback) => {
    console.log('socket => "get messages", chatId:', chatId, 'startIndex:', startIndex, 'count:', count, 'callback:', callback)
    const messages = await MessageController.getMessages(chatId)
    // пачка сообщений

    const newMessages = messages.slice(startIndex, startIndex + count);
    console.log('allMessages befor pagination:', messages)
    console.log('pagination:::', newMessages)
    callback(newMessages);
  });
});

server.listen(PORT, () => console.log('server work'));