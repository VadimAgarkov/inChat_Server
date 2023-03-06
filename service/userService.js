const mailService = require('./mailService')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const TokenService = require('./tokenService.js');
const UserDto = require('../DTOs/user-dto.js');
const GetFromBD = require('./getOther.js');
const { error } = require('console');


class userService {

  async Registration (fullName, bithday, email, password) {
    try{
      // Наличие пользователей с таким же EMAIL 
      const count = await prisma.users.count({
        where: {
          email : email
        }
      });
      if(count) {
        console.log('Данный Email уже существует')
        
      }
      console.log('1',count)
      //проверка валиации
      console.log('2','Validation OK')
      
      // хэширование Пароля.Генерация Линки для активации
      const HashPassword = await bcrypt.hash(password, 3);
      console.log('3','хэширование ОК', HashPassword)
      const activationLink = 'sisidididididididid';
      // записываем пользователя в БД
      const user = await prisma.users.create({
        data: {
          fullName : fullName,
          email: email,
          bithday: bithday,
          password: HashPassword,
        }
      });
      console.log('4','Create finish')
      // отправляем линку активации на мыло
      // await mailService.sendActivationMail(email, activationLink);

      const userDto = new UserDto(user); //id,email,isActv
      const tokens = TokenService.GenerateToken({...userDto});
      console.log('7','token generate finish', tokens.refreshToken)
      
      await TokenService.saveToken(userDto.id, tokens.refreshToken);
      console.log('8',"return")
      return {}
    }catch(e){
      console.log(e)
    };
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