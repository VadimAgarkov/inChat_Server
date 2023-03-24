const {check} = require('express-validator');
const UserController = require('../controllers/user-controller.js');
const Router = require('express')
const router = new Router();
const GetFromBD = require('../service/getUserIdWith.js')




router.post('/registration',
[
  check("email", "Имя пользователя не может быть пустым!").notEmpty(),
  check("password", "Пароль пользователя не может быть пустым!").notEmpty(),
  check("password", "Пароль должен сожержать не менее 8 символов!").isLength({min: 8, max: 16})
],UserController.Registration)

router.post('/auth', UserController.Authentication)

router.post('/login', [
  check("email", "Имя пользователя не может быть пустым!").notEmpty(),
  check("password", "Пароль пользователя не может быть пустым!").notEmpty(),
], UserController.Authorization)

router.get('/all', GetFromBD.getAll)






// router.post('/login')



// router.post('/login', (req, res) => {
//   console.log("login", req.body)
  
// })

router.get('/activate/:Link')
router.get('/refresh')
router.get('/getUsers',)


module.exports = router;