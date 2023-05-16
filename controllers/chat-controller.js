const getUser = require('../service/getUserIdWith.js');
const getChat = require('../service/chatService.js');
const CRUD = require('../service/crud.js')
const ChatDTO = require('../DTOs/chat-dto.js')

class ChatController {
  async newChat(req, res) {
    const { user_1, subscriber } = req.body.data;
    const user = await getUser.getByToken(user_1);
    const chat = await getChat.getChatWithUsers(user.user_id, subscriber);
    if (chat) {
      res.status(200).json(chat);
    } else {
      const newChat = await CRUD.createChat(user.user_id, subscriber);
      res.json(newChat);
    }
  };

  async getChat(req, res) {
    const data = req.body;
    const id_chat = data.data.chat_id;
    const initiator = data.data.initiator;
    const chat = await getChat.getChatWithId(id_chat);
    ////SEARCHING INITIATOR CHATS ////
    const findUser = () => {
      if (chat.user_chats[0].user_1 == initiator) {
        return chat.user_chats[0].user_2;
      } else {
        return chat.user_chats[0].user_1;
      }
    };
    const userID = findUser();
    const user = await getUser.getById(userID);
    const chatDTO = new ChatDTO(user, chat);
    res.json(chatDTO);
  }
};

module.exports = new ChatController();