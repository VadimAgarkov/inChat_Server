const userService = require('../service/userService.js');
const getUserIdWith = require('../service/getUserIdWith.js');

class UserController {

  async Registration(req, res) {
    console.log('0...Reg.....')
    try{
      console.log('...istration..........',req.body)
      const {fullName, email, bithday, password} = req.body;

      const userData = await userService.Registration(fullName, email, bithday, password);
      res.cookie('refreshToken:', userData, {maxAge: 2592000000, httpOnly : true}); //30 дней срок
      
      return res.json('user added'), console.log('response');
    } catch(e) {
      console.log(e.error);
    };
  };

  async Authentication (req, res) {
    try {
      console.log('Authentication..........')
      const { access_token } = req.body;
      const user = getUserIdWith.getByToken(access_token);
      if (!user) {
        res.status(401);   // "Not authorized" на клиенте обработка кода и перенаправление на авторизацию
        res.send('Not authorized'); 
      } else {
        res.json({user})
      }
    } catch(e) {
      console.log(e)
    };
  };

  async Authorization (req, res) {
    try {
      const {email, password, remember} = req.body;
      console.log("1......", req.body)
      const userData = await userService.Login(email, password)
      console.log('2....', userData);
      
      if(remember) {
        res.json()
        // отправить access_token на клиент
      }
    } catch (e) {
      console.log(e)
    };
  };

  async (req, res) {
    try {
      const { } = req.body;
    } catch (e) {
      console.log(e)
    };
  };

};




module.exports = new UserController();

