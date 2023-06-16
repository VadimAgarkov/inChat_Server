const { check } = require('express-validator');
const UserController = require('../controllers/user-controller.js');
const crud = require('../service/crud.js');
const Router = require('express');

const router = new Router();

router.post('/registration',
  [
    check('email', 'Имя пользователя не может быть пустым!').notEmpty(),
    check('password', 'Пароль пользователя не может быть пустым!').notEmpty(),
    check('password', 'Пароль должен сожержать не менее 8 символов!').isLength({ min: 8, max: 16 })
  ], UserController.registration)
router.post('/auth', UserController.authentication);

router.post('/login', [
  check('email', 'Имя пользователя не может быть пустым!').notEmpty(),
  check('password', 'Пароль пользователя не может быть пустым!').notEmpty(),
], UserController.authorization);
router.post('/delete', crud.deleteUser);
router.get('/all', UserController.getAllUsers);
router.get('/alltokens', UserController.getAllTokens);
router.post('/contacts', UserController.getAllUsers);

module.exports = router;