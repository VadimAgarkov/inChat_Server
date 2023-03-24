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

app.post('/login', (req, res) => {
  const {Email, Password} = req.body;

  
  console.log('Email:', Email || "no data", 'Password:', Password || "no data") 
  res.json('dcdcdc');
});

app.post('/auth', (req, res) => {
  const {access_token} = req.body;

  
  console.log('access_token:', access_token) 
  res.json('dcdcdc');
});



io.on('connection', ( socket) => {
  console.log('user connected', socket.id)

  // socket.on('autentification', (soket) => {
  //   console.log(' checking token ', soket.cookie);
  //     socket.emit('time', new Date());
  // });
});

// const cookieString = io.request.headers.cookie

server.listen(PORT, ()=>console.log('server work'))





// module.exports = prisma;