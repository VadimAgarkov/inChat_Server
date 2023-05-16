const userService = require('../service/userService.js');
const getUserIdWith = require('../service/getUserIdWith.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


class UserController {

  async Registration(req, res) {
    console.log('0...Reg.....')
    try {
      console.log('...istration..........', req.body)
      const { FullName, Phone, Email, Bithday, Password } = req.body;
      const userData = await userService.Registration(FullName, Phone, Email, Bithday, Password);
      res.cookie('Tokens:', userData, { maxAge: 2592000000, httpOnly: true }); //30 дней срок
      return res.status(200).json({ access_token: userData.access_token, refresh_token: userData.refresh_token });
    } catch (e) {
      console.log(e.error);
    };
  };

  async Authentication(req, res) {
    try {
      console.log('Authentication..........')
      const { access_token } = req.body.data;
      console.log('authentication:: access_token:', access_token)
      // const user = await getUserIdWith.getByToken(access_token);
      const user = await userService.Authentication(access_token)
      console.log('FindUserByToken', user)
      if (user) {
        console.log('authentication:: response to client::', user)
        const data = res.send(user)
        //  return [data]
      } else {
        // "Not authorized" на клиенте обработка и перенаправление на авторизацию
        console.log('not authorized')
        res.send('Not authorized');
      }
    } catch (e) {
      console.log(e)
    };
  };

  async Authorization(req, res) {
    try {
      const { Email, Password, remember } = req.body;
      console.log("1......req body", req.body);
      console.log('email req body', Email)
      const userData = await userService.Login(Email, Password);
      console.log('2......', userData);
      if (userData) {
        res.status(200).json(userData);

      } else {
        res.status(304).json('Error Authorization')
      }
    } catch (e) {
      console.log(e)
    };
  };

  async getUser(req, res) {
    console.log(req.body)
    const id = req.body.data.id;
    if (id === null) {
      console.log('id==null => res = try again')
      res.send('try again')
    } else {
      const user = await getUserIdWith.getById(id)
      console.log('request:: data => userPage:: ', user)
      if (user === null) {
        res.status(404)
      }
      const data = res.json(user)
      return [data];


    }
    // const id = data
  }


  async updateUser(req, res) {

    const user = await getUserIdWith.getByToken(req.body.data.access_token)

    console.log('user_id::', user)


    const data = Object.keys(req.body.data).reduce((obj, key) => {
      if (key !== 'access_token' && req.body.data[key] !== null) {
        obj[key] = req.body.data[key];
      }
      return obj;
    }, {});
    console.log(data)
    const newData = await userService.UpdateUser(user, data)

    console.log('UserController => update user::', newData)
    if (newData) {
      const data = res.json(newData)
      return [data], console.log('Update User => response');
    }

  }


  async getChats(req, res) {
    const user = await getUserIdWith.getByToken(req.body.data.access_token)

    console.log('initiator:::::::::::::',user)

    const userChats = await prisma.user_chats.findMany({
      where: {
        OR: [
          { user_1: user.user_id },
          { user_2: user.user_id },
        ],
      },
      include: {
        chat: true,
      },
    });
    userChats.map((item) => {
      item.initiator = user.user_id
    })
    console.log('userController => userChats', userChats)
    const data = res.json(userChats)
    return data;
  };

  async getUsersId(req, res) {
    console.log('запрос ID по токену', req.body.data)
    const data = await getUserIdWith.getByToken(req.body.data.cookie)
    const secondUser = await getUserIdWith.
    console.log( 'userId',data);
    const id = res.json(data)
    return id
  }

  


  // ===============================================================================================================?
  async getAllUsers(req, res) {
    try {
      console.log('data req:::::',req.body.data)
      const users = await getUserIdWith.getAll()
      console.log(users)
      res.json(users)
    } catch (e) {
      console.log(e)
    };
  };

  async getAllTokens(req, res) {
    try {
      const tokens = await getUserIdWith.getAllTokens()
      res.send(tokens)
    } catch (e) {
      console.log(e)
    };
  };



};

module.exports = new UserController();