const mailService = require('./mailService')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const TokenService = require('./tokenService.js');
const UserDto = require('../DTOs/user-dto.js');


class userService {
  async registration (fullName, bithday, email, password) {
    const errors = validationResult({fullName, bithday, email, password})
      if(!errors.isEmpty()) {
        throw new Error('Ошибка валидации Login Password')
      };
    const person = prisma.users.findFirst({
      where: {
        email: email
      }
    });
    if (person) {
      throw new Error('пользователь c таким Email уже существует')
    }

    const HashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await prisma.users.create({
      data: {
        fullName : fullName,
        email: email,
        bithday: bithday,
        password: HashPassword,
      }
    });
    await mailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user); //id,email,isActv
    const tokens = TokenService.GenerateToken({...userDto});
    
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto}
  };

  async findUserWithEmail(Email) {
    const Person = await prisma.users.findFirst({
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

module.export = new userService();