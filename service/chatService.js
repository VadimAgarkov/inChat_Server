const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

class ChatService {
  async getChatWithUsers(user_1, user_2) {
    const chat = await prisma.chat.findFirst({
      where: {
        user_chats: {
          some: {
            OR: [
              { user_1: user_1, user_2: user_2 },
              { user_1: user_2, user_2: user_1 },
            ]
          }
        }
      },
      include: {
        messages: true,
        user_chats: true,
      }
    });
    if (chat) {
      return { chat }
    } else {
    }
  };

  async getChatWithId(id) {
      const chat = await prisma.chat.findFirst({
        where: {
          id: id
        },
        select: {
          id: true,
          messages: true,
          user_chats: true,
        }
      })
      return chat;
    }
};

module.exports = new ChatService();

