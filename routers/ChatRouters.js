const Router = require('express')
const ChatController = require('../controllers/chat-controller.js');

const ChatRouter = new Router();

ChatRouter.post('/add_chat', ChatController.newChat);
ChatRouter.post('/getChat', ChatController.getChat);
ChatRouter.post('/get_data_for_chat', ChatController.getData);


module.exports = ChatRouter;