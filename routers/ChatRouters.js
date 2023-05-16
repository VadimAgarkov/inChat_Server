const Router = require('express')
const ChatRouter = new Router();

const ChatController = require('../controllers/chat-controller.js');

ChatRouter.post('/add_chat', ChatController.newChat)

ChatRouter.post('/getChat', ChatController.getChat)



module.exports = ChatRouter