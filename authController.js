const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const {secret} = require("./jwt_key");
// const CRUD = require('./CRUDgenerates') 


const generateToken = (id, email) =>  {
  const payload = {
    id: id,
    email: email
  }
  return jwt.sign(payload, secret, {expiresIn: '12h'});
}

class authController {

async registration (req, res) {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({message: "Ошибка валидации Пароль Мыло"})
    }
    const {fullName, bithday, email, password} = req.body;
    const checkEmail = await prisma.users.findMany({
      where: {
        email: email
      },
    })
    // console.log(checkEmail)
    if (checkEmail.length) {
      return res.status(400).json({message:'пользователь c таким Email уже существует'})
    } 
    const HashPassword = await bcrypt.hash(password, 6);
    // console.log( "хэээшшшшшшшш",HashPassword)
    const user =  await prisma.users.create({
      data: {
        email: email,
        password: HashPassword,
        bithday: bithday,
        fullName: fullName
      },
    });
    res.status(200).json({message : "Пользователь успешно зарегистрирован"})
  } catch (e) {
    console.log(e);
    res.status(400).json({message: 'Registration ERROR'})
  };
  const check = await prisma.users.findMany()
  console.log(check)
};




async login (req, res) {
  try {
    const {email, password} = req.body;
    console.log('REQBODY', email, password)
    const person = await prisma.users.findFirst({
       where: {
        email: email
      },
    });
    if (!person) {
      return res.status(400).json({message: `Пользователь ${email} не зарегистрирован!`})
    }
    console.log("PERSON",person.password)
    const validPersonPass =  bcrypt.compareSync(password, person.password);
    if (!validPersonPass) {
      return res.status(400).json({message: `Неверный пароль!`})
    }
    
    const token = generateToken(person.id, person.email)
    return res.json({token})
    



  } catch (e) {
    console.log(e);
    res.status(400).json({message: 'Login ERROR'})
  };
};

async getUsers (req, res) {
  try {
    res.json('server has work')

  } catch (e) {
    console.log(e)
  };
}; 

};

module.exports = new authController();