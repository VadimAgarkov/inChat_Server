const Router = require('express');
const router = new Router();
const controller = require('./authController')
const {check} = require('express-validator')


router.post('/registration', 
            [
              check("email", "Имя пользователя не может быть пустым!").notEmpty(),
              check("password", "Пароль пользователя не может быть пустым!").notEmpty(),
              check("password", "Пароль должен сожержать не менее 8 символов!").isLength({min: 8, max: 16})
            ],
            controller.registration);

router.post('/login', 
            [
              check("email", "Имя пользователя не может быть пустым!").notEmpty(),
              check("password", "Пароль пользователя не может быть пустым!").notEmpty(),
              check("password", "Пароль должен сожержать не менее 8 символов!").isLength({min: 4, max: 10})
            ], 
            controller.login);

router.get('/users', controller.getUsers)


module.exports = router;