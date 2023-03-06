const userService = require('../service/userService');

class UserController {

  async Registration(req, res) {
    console.log('reg.....')
    try{
      console.log('registration..........')
      const {fullName, bithday, email, password} = req.body;
      const userData = await userService.Registration(fullName, bithday, email, password);
      console.log('user add...........',userData);
      res.cookie('refreshToken:', userData.refresh_token, {maxAge: 2592000000, httpOnly : true}); //30 дней срок
      
      return res.json(userData), console.log('response');
    } catch(e) {
      console.log(e);
    };
  };

  async login (req, res) {
    try {

      const { } = req.body;
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

  async (req, res) {
    try {
      const { } = req.body;
    } catch (e) {
      console.log(e)
    };
  };

};




module.exports = new UserController();
  // async NAME(req, res, next) {
  //   try{
  //    const {} = req.body;

  //  }catch(e){

  //   }
  // };

  // async NAME(req, res, next) {
  //   try{
  //     const {} = req.body;

  //   }catch(e){

  //   }
  // };

  // async NAME(req, res, next) {
  //   try{
  //     const {} = req.body;

  //   }catch(e){

  //   }
  // };

  // async NAME(req, res, next) {
  //   try{
  //     const {} = req.body;

  //   }catch(e){

  //   }
  // };

  // async NAME(req, res, next) {
  //   try{
  //     const {} = req.body;

  //   }catch(e){

  //   }
  // };

  // async NAME(req, res, next) {
  //   try{
  //     const {} = req.body;

  //   }catch(e){

  //   }
  // };

  // async NAME(req, res, next) {
  //   try{
  //     const {} = req.body;

  //   }catch(e){

  //   }
  // };



// async NAME(req, res, next) {
//   try{
//     const {} = req.body;

//   }catch(e){

//   }
// };
