require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const userRouter = require('./routers/index')


const PORT = 8080;
const app = express();

app.use(express.json());//
app.use(cors())//
app.use(cookieParser())
app.use('/app', userRouter);








app.listen(PORT, () => console.log(`Server sterted on  ${PORT}`));





module.exports = prisma;