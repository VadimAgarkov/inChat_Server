const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');



class Crud {
  async CreateUser(fullName, phone, email, bithday, password) {
    console.log('strating....CreateUser ....CRUD:', fullName, phone, email, bithday, password)
    try {
      const hashPassword = await bcrypt.hash(password, 3)
      console.log('Crud.CreateUser.hashPassword::', hashPassword)
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

  async ReadUser(user_id) {
    console.log('reading the user...', user_id)
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
          profile: true
        }
      })
    } catch (e) {
      console, log(e.error)
    }
  }

  async UpdateUser(user_id, update_fields, select) {
    console.log('Update the User data...')
    try {
      const newData = await prisma.users.update({
        where: {
          id: user_id
        },
        update: update_fields,
        select: select

      })
    } catch (e) {

    }
  }

  async DeleteUser(req, res) {
    console.log(req.body.id)
    const usid = req.body.id
    console.log("delete the user");
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
  }

  async CreateChat(user_1, user_2) {
    const create = await prisma.chat.create({
      data: {
        messages: {},
        user_chats: {}
      }
    });

    const chat = await prisma.user_chats.create({
      data: {
        chat_id:  create.id ,
        user_1: user_1,
        user_2: user_2,
      },
    });
    console.log('newChat::',create)
    
    console.log('created chat::newChat::',chat)
    return chat.chat_id
  }
}

module.exports = new Crud();