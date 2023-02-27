const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authRouter = require('./authRouter')
const prisma = new PrismaClient();


const PORT = 8080;

const app = express();

app.use(express.json());

app.use('/auth', authRouter)






app.listen(PORT, () => console.log(`Server sterted on  ${PORT}`));





module.exports = prisma;