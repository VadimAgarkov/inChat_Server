const getUser = require('../service/getUserIdWith.js');
const getChat = require('../service/chatService.js');
const CRUD = require('../service/crud.js')
const ChatDTO = require('../DTOs/chat-dto.js')

class ChatController {
  async newChat(req, res) {
    const { user_1, subscriber } = req.body.data;
    const user = await getUser.getByToken(user_1);
    const chat = await getChat.getChatWithUsers(user?.user_id, subscriber);
    if (chat) {
      res.status(200).json(chat);
    } else {
      const newChat = await CRUD.createChat(user.user_id, subscriber);
      res.json(newChat);
    }
  };

  async getChat(req, res) {
    console.log('GET CHAT')
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

  async getData(req, res) {
    const cookie = req?.body?.data?.cookie;
    const idChat = req?.body?.data?.id;
    const initiatorId = await getUser.getByToken(cookie);
    const chat = await getChat.getChatWithId(+idChat)
    const findUser = () => {
      if (chat.user_chats[0].user_1 === initiatorId.user_id) {
        return chat.user_chats[0].user_2;
      } else {
        return chat.user_chats[0].user_1;
      }
    };
    const user_id = findUser()
    const Data = await getUser.getById(user_id)
    const userData = { fullName: Data.fullName, online: Data.online, avatar: Data.avatar, phone: Data.phone}

    res.send(userData)

  }
};

module.exports = new ChatController();