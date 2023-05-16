const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const getUser = require('../service/getUserIdWith.js');
const getChat = require('../service/chatService.js');
const CRUD = require('../service/crud.js')
const ChatDTO = require('../DTOs/chat-dto.js')


class ChatController {
  async newChat(req, res) {
    console.log('CHAT CONTROLLER => NEW_CHAT => REQ.BODY (USER_1, SUBSCRIBER)::',req.body)
    const { user_1, subscriber } = req.body.data
    console.log('SUBSCRIBER:::: NUMBER',subscriber)
    const user = await getUser.getByToken(user_1);
    
    const chat = await getChat.getChatWithUsers(user.user_id, subscriber)
   
    if (chat) {
      res.status(200).json(chat);
    } else {
      const newChat = await CRUD.CreateChat(user.user_id, subscriber)
      console.log('ты создал чат с id:', newChat)
      res.json(newChat)
    }
  };

  async getChat(req, res) {
    const data = req.body;
    console.log('get chat field', data)
    const id_chat = data.data.chat_id
    const initiator = data.data.initiator

    const chat = await getChat.getChatWithId(id_chat)
    console.log('ChatController => Get-chat:', chat.user_chats[0].user_1)

    ////SEARCHING INITIATOR CHATS /////////////////////////
    const findUser = () => {
      if (chat.user_chats[0].user_1 == initiator) {
        return chat.user_chats[0].user_2
      } else {
        return chat.user_chats[0].user_1
      }
    }
    const userID = findUser()
    ////////////////////////////////

    const user = await getUser.getById(userID)

    console.log('user::::', user, 'chat:::', chat)

    const chatDTO = new ChatDTO(user, chat)
    console.log('chatDTOOOOOOOOOOOOOOOOOOOOOOOOOOOOO::::', chatDTO)

    res.json(chatDTO)
  }
}

module.exports = new ChatController();