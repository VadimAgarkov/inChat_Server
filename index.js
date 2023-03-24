const dotenv = require('dotenv').config();
const app = require('express')();
const express = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors : {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routers/index')

// const GetFromBD = require('service/getUserIdWith.js')


const PORT = 8081;


app.use(express.json());//
app.use(cors())//
app.use(cookieParser())
app.use('/', userRouter);





io.on('connection', ( socket ) => {
  console.log('user connected', socket.id)

});



server.listen(PORT, () => console.log('server work'))





// module.exports = prisma;