const userService = require('../service/userService');

class UserController {

  async Registration(req, res) {
    try{
      const {fullName, bithday, email, password} = req.body;
      const userData = await userService.registration(fullName, bithday, email, password);
       // res.cookie('refreshToken:', userData.refreshToken, {maxAge: 2592000000, httpOnly : true}) //30 дней

      return res.json(userData);
    } catch(e) {
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
