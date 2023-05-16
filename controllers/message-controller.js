const MessageServer = require('../service/messageService.js');
const GetUserIdWith = require('../service/getUserIdWith.js');

class MessageController {
  async writeMessage(data) {
    const {chat_id, content, sender} = data;
    const user_id = await GetUserIdWith.getByToken(sender);
    const newData = {chat_id, user_id, content};
    const message = await MessageServer.create(newData);
    return message;
  };

  async getMessages(chat_id) {
    const messages = await MessageServer.read(chat_id);
    return messages;
  }
};

module.exports = new MessageController();