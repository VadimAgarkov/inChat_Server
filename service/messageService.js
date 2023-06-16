const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


class MessageController {

  // CRUD
  async create(data) {
    const { chat_id, user_id, content} = data;
    const message = await prisma.message.create({
      data: {
        content,
        sender:  user_id.user_id ,
        chat: {
          connect: { id: parseInt(chat_id) },
        },
      },
    });
    return message;
  }; 

  async read(chat_id) { 
    const messages = await prisma.message.findMany({
      where: {
        chat_id: parseInt(chat_id.id)|| chat_id.id,
      },
      select: {
        id: true,
        content: true,
        chat_id: true,
        sender: true,
        date: true,
        is_read: true,
      }
    });
    return messages;
  };

  async update(req, res) {
  };

  async delete(req, res) {
  };
};

module.exports = new MessageController()