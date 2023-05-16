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

  async Authentication(access_token) {
    const getIdUser = await TokenService.checkAccessToken(access_token);
    if (getIdUser == null) {
      return undefined
    }
    console.log('authentication:: get User By ACCESS_TOKEN', getIdUser)
    const user = await GetFromBD.getById(getIdUser)
    console.log('authentication:: user', user)
    return user
  };

  async Registration(fullName, phone, email, bithday, password) {
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
      },
        console.log('pop', fullName, phone, email, bithday, password))
      if (count.id) {
        console.log('00....Данный Email уже существует....00::', email, 'count:', count)
      } else {
        console.log('1...Проверка на наличие в DB  Email::', email, 'count:', count, true);


        // console.log('3','хэширование OK', hashPassword)
        const activationLink = 'link';
        // записываем пользователя в БД
        const user = await CRUD.CreateUser(fullName, phone, email, bithday, password);
        console.log('4', 'Create finish')
        console.log('5', 'user create:', user)
        // отправляем линку активации на мыло
        // await mailService.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user); //id,email,isActv
        console.log('6', 'userDTO', userDto)

        // const tokens = await TokenService.GenerateToken({...userDto});
        const tokens = TokenService.GenerateToken({ ...userDto });
        console.log('7', 'token generate finish', tokens);

        await TokenService.saveRefreshToken(userDto.id, tokens.refresh_token);

        await TokenService.saveAccessToken(userDto.id, tokens.access_token)

        console.log('8', "registration finished:", "user::", user,);
        console.log('9', 'reg.fin. reterned tokens::', tokens);

        return tokens
      }
    } catch (e) {
      console.log(e.error)
    };
  };



  async Login(contact, password) {

    let user = {};
    if (/[@.a-z]/.test(contact)) {
      const check = await GetFromBD.getByMail(contact);
      if (check)
        user = check;
      console.log("мыло контакт", contact);
      console.log("Login, validation", check);

    } else {
      const check = await GetFromBD.getByPhone(contact)
      console.log("Login, validation", check)
      console.log("мыло контакт", contact)
      user = check;
    }

    console.log('1...', user);
    // const hashPassword = hash.generate(password);
    // const passwordBD = await prisma.user.g
    console.log('password:', password)
    const checkPassword = await bcrypt.compare(password, user.password)

    console.log('checkPassword', checkPassword)

    if (checkPassword) {
      const userDto = new UserDto(user)
      const tokens = TokenService.GenerateToken({ ...userDto })

      const access_token = await TokenService.saveAccessToken(user.id, tokens.access_token)

      const refresh_token = await TokenService.saveRefreshToken(user.id, tokens.refresh_token)

      return ({ access_token: tokens.access_token, refresh_token: tokens.refresh_token });
    } else {
      throw new Error('Неверный пароль');
    }
  };


  async UpdateUser(user, data) {



    const id = user.user_id

    console.log('айди юзера апдейт', id)

    const newData = await prisma.users.update({
      where: {
        id: id
      },
      data,

    })


    return newData

  }

  // ================================================================================================

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