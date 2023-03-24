const mailService = require('./mailService.js')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
// const hash = require("password-hash");
const {validationResult} = require("express-validator");
const TokenService = require('./tokenService.js');
const UserDto = require('../DTOs/user-dto.js');
const GetFromBD = require('./getUserIdWith.js');
const CRUD = require('./crud.js');


class userService {
  
  async Registration (fullName, email, bithday, password) {
    try {
      // Наличие пользователей с таким же EMAIL 
      const count = await prisma.users.count({
        
        where: {
          email : email
        },
        select: {
          id: true,
          email: true
        }
      }, console.log('pop'))
      if(count.id) {
        console.log('00....Данный Email уже существует....00::', email, 'count:', count)

      } else {
        console.log('1...Проверка на наличие в DB  Email::', email,'count:', count);
       
        
        // console.log('3','хэширование OK', hashPassword)
        const activationLink = 'link';
        // записываем пользователя в БД
        const user = await CRUD.CreateUser(fullName, email, bithday, password);
        console.log('4','Create finish')
        console.log('5','user create:', user)
        // отправляем линку активации на мыло
        // await mailService.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user); //id,email,isActv
        console.log('6','userDTO', userDto)
        
        // const tokens = await TokenService.GenerateToken({...userDto});
        const tokens =  TokenService.GenerateToken({...userDto});
        console.log('7','token generate finish', tokens);
        
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        console.log('8',"return");

        return tokens.refreshToken, console.log('return refreshToken:',tokens.refreshToken)
      }
    }catch(e){
      console.log(e.error)
    };
  };



  async Login(contact, password) {
   
    let user = {};
      if (/[@.a-z]/.test(contact)) {
        const check = await GetFromBD.getByMail(contact);
        user = check;
        console.log("мыло контакт", contact);
        console.log("Login, validation", check);
      } else {
        const check = await GetFromBD.getByPhone(contact)
        console.log("Login, validation", check)
        console.log("мыло контакт", contact)
      }
      
    
    console.log('1...', user);
    // const hashPassword = hash.generate(password);
    // const passwordBD = await prisma.user.g
    const checkPassword = await bcrypt.compare(password, user.password)
    
    console.log('checkPassword', checkPassword)
    
    if (checkPassword) {
      const userDto = new UserDto(user)
      const tokens =  TokenService.GenerateToken({...userDto})

      return (
      console.log('еебать! я тебя поздравляю ты закончил с этим дерьмом!!!!'),
      user)
    } else {
      throw new Error('Неверный пароль')
    }

  



  };

  async findUserWithEmail(Email) {
    const Person = await prisma.users.findUnique({
      where: {
        email : Email
      }
    })
    return Person;
  }

  async findUserWithPhone(Phone) {
    const Person = await prisma.users.findFirst({
      where: {
        phone : Phone
      }
    });
    return Person;
  };

};

module.exports = new userService();