const MessageServer = require('../service/messageService.js')
const GetUserIdWith = require('../service/getUserIdWith.js')

class MessageController {
  async writeMessage(data) {
    const {chat_id, content, sender} = data;
    console.log("MessageController => writemessage::data::",chat_id, content, sender)
    const user_id = await GetUserIdWith.getByToken(sender)
    const newData = {chat_id, user_id, content}
    const message = await MessageServer.Create(newData)
    console.log('message-controller => Writing message:::', true)
    return message
  };

  async getMessages(chat_id) {
    console.log('message-controller => Get message => Chat_id (number)::', chat_id)
    const messages = await MessageServer.Read(chat_id);
    return messages;
  }
};


module.exports = new MessageController();