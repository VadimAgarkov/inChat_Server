const Router = require('express')
const ChatController = require('../controllers/chat-controller.js');

const ChatRouter = new Router();

ChatRouter.post('/add_chat', ChatController.newChat);
ChatRouter.post('/getChat', ChatController.getChat);

module.exports = ChatRouter;