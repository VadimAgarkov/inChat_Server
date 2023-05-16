const Router = require('express');
const userRouter = new Router();
const UserController = require('../controllers/user-controller.js');
const userController = require('../controllers/user-controller.js');

userRouter.post('/', UserController.getUser);
userRouter.post('/token', UserController.getUsersId);
userRouter.post('/update', UserController.updateUser);
userRouter.post('/chats', userController.getChats); /*ПЕРЕНЕСТИ В ChatRouters!!!*/

module.exports = userRouter;