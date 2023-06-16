const userService = require('../service/userService.js');
const getUserIdWith = require('../service/getUserIdWith.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


class UserController {

  async registration(req, res) {
    try {
      const { FullName, Phone, Email, Bithday, Password } = req.body;
      const userData = await userService.registration(FullName, Phone, Email, Bithday, Password);
      res.cookie('Tokens:', userData, { maxAge: 2592000000, httpOnly: true }); //30 дней срок
      return res.status(200).json({ access_token: userData.access_token, refresh_token: userData.refresh_token });
    } catch (e) {
      console.log(e.error);
    };
  };

  async authentication(req, res) {
    try {
      const { access_token } = req.body.data;
      const user = await userService.authentication(access_token);
      if (user) {
        const data = res.send(user);
      } else {
        res.send('Not authorized');
      }
    } catch (e) {
      console.log(e);
    };
  };

  async authorization(req, res) {
    try {
      const { Email, Password, remember } = req.body;
      const userData = await userService.login(Email, Password);
      if (userData) {
        res.status(200).json(userData);
      }
    } catch (e) {
      res.status(304).json('Error Authorization');
      console.log(e);
    };
  };

  async getUser(req, res) {
    const id = req.body.data.id;
    if (id === null) {
      res.send('try again')
    } else {
      const user = await getUserIdWith.getById(id)
      if (user === null) {
        res.status(404)
      }
      const data = res.json(user)
      return [data];
    }
  };

  async updateUser(req, res) {
    const user = await getUserIdWith.getByToken(req.body.data.access_token);
    const data = Object.keys(req.body.data).reduce((obj, key) => {
      if (key !== 'access_token' && req.body.data[key] !== null) {
        obj[key] = req.body.data[key];
      }
      return obj;
    }, {});
    const newData = await userService.updateUser(user, data);
    if (newData) {
      const data = res.json(newData)
      return [data];
    }
  };

  async getChats(req, res) {
    const user = await getUserIdWith.getByToken(req?.body?.data?.access_token)
    if(!user) {
      const data = res.json(null);
    return data;
    }
    const userChats = await prisma.user_chats.findMany({
      where: {
        OR: [
          { user_1: user?.user_id },
          { user_2: user?.user_id },
        ],
      },
      include: {
        chat: true,
      },
    });
    userChats.map((item) => {
      item.initiator = user.user_id;
    })
    const data = res.json(userChats);
    return data;
  };

  async getUsersId(req, res) {
    const data = await getUserIdWith.getByToken(req.body.data.cookie);
    const id = res.json(data);
    return id;
  };

  async getAllUsers(req, res) {
    try {
      const users = await getUserIdWith.getAll();
      res.json(users);
    } catch (e) {
      console.log(e);
    };
  };

  async getAllTokens(req, res) {
    try {
      const tokens = await getUserIdWith.getAllTokens();
      res.send(tokens);
    } catch (e) {
      console.log(e);
    };
  };
};

module.exports = new UserController();