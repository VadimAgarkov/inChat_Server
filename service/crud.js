const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();



class Crud {
  async createUser(fullName, phone, email, bithday, password) {
    try {
      const hashPassword = await bcrypt.hash(password, 3)
      const user = await prisma.users.create({
        data: {
          fullName: fullName,
          phone: phone,
          email: email,
          bithday: bithday,
          password: hashPassword,
        },
      });
      return user;

    } catch (e) {
      console.log(e.error)
    }
  }

  async readUser(user_id) {
    try {
      const user = await prisma.users.findUniquie({
        where: {
          id: user_id
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          bithday: true,
          profile: true,
          online: true,
        }
      })
    } catch (e) {
      console, log(e.error)
    }
  }

  async updateUser(user_id, update_fields, select) {
    try {
      const newData = await prisma.users.update({
        where: {
          id: user_id
        },
        update: update_fields,
        select: select
      });
    } catch (e) {

    }
  }

  async deleteUser(req, res) {
    const usid = req.body.id;
    try {
      const delete_user = await prisma.users.delete({
        where: {
          id: usid
        }
      })
      return delete_user
    } catch (e) {
      console.log(e.error)
    }
  };

  async createChat(user_1, user_2) {
    const create = await prisma.chat.create({
      data: {
        messages: {},
        user_chats: {}
      }
    });
    const chat = await prisma.user_chats.create({
      data: {
        chat_id: create.id,
        user_1: user_1,
        user_2: user_2,
      },
    });
    return chat.chat_id
  }
};

module.exports = new Crud();