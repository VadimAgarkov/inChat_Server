const mailService = require('./mailService.js')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
// const hash = require("password-hash");
const { validationResult } = require("express-validator");
const TokenService = require('./tokenService.js');
const UserDto = require('../DTOs/user-dto.js');
const GetFromBD = require('./getUserIdWith.js');
const CRUD = require('./crud.js');


class userService {

  async authentication(access_token) {
    const getIdUser = await TokenService.checkAccessToken(access_token);
    if (getIdUser == null) {
      return undefined
    }
    const user = await GetFromBD.getById(getIdUser)
    return user
  };

  async registration(fullName, phone, email, bithday, password) {
    try {
      // Наличие пользователей с таким же EMAIL 
      const count = await prisma.users.count({
        where: {
          email: email
        },
        select: {
          id: true,
          email: true
        }
      });
      if (count.id) {
        console.log('00....Данный Email уже существует....00::', email, 'count:', count)
      } else {
        const activationLink = 'link';
        // записываем пользователя в БД
        const user = await CRUD.createUser(fullName, phone, email, bithday, password);
        // отправляем линку активации на мыло
        const userDto = new UserDto(user); //id,email,isActv
        const tokens = TokenService.generateToken({ ...userDto });
        await TokenService.saveRefreshToken(userDto.id, tokens.refresh_token);
        await TokenService.saveAccessToken(userDto.id, tokens.access_token)
        return tokens
      }
    } catch (e) {
      console.log(e.error)
    };
  };

  async login(contact, password) {
    let user = {};
    if (/[@.a-z]/.test(contact)) {
      const check = await GetFromBD.getByMail(contact);
      if (check)
        user = check;
    } else {
      const check = await GetFromBD.getByPhone(contact)
      user = check;
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (checkPassword) {
      const userDto = new UserDto(user)
      const tokens = TokenService.generateToken({ ...userDto })
      const access_token = await TokenService.saveAccessToken(user.id, tokens.access_token)
      const refresh_token = await TokenService.saveRefreshToken(user.id, tokens.refresh_token)
      return ({ access_token: tokens.access_token, refresh_token: tokens.refresh_token });
    } else {
      throw new Error('Неверный пароль');
    }
  };


  async updateUser(user, data) {
    const id = user.user_id
    const newData = await prisma.users.update({
      where: {
        id: id
      },
      data,
    })
    return newData
  };

  async findUserWithEmail(Email) {
    const Person = await prisma.users.findUnique({
      where: {
        email: Email
      }
    })
    return Person;
  }

  async findUserWithPhone(Phone) {
    const Person = await prisma.users.findFirst({
      where: {
        phone: Phone
      }
    });
    return Person;
  };

};

module.exports = new userService();