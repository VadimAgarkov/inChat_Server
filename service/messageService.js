const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


class MessageController {

  // CRUD
  async Create(data) {
    const { chat_id, user_id, content} = data;
    console.log('create message with data:',chat_id, user_id, content)
    const message = await prisma.message.create({
      data: {
        content,
        sender:  user_id.user_id ,
        chat: {
          connect: { id: parseInt(chat_id) },
        },
      },
    });
    return console.log('Create new Message:::',message), message;
  }; 

  async Read(chat_id) { 

    console.log('chat id find',chat_id)
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

  async Update(req, res) {

  };

  async Delete(req, res) {

  };


}

module.exports = new MessageController()