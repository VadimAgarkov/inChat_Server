const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');



class Crud {
  async CreateUser(fullName, email, bithday, password) {
    console.log('strating....CreateUser ....CRUD')
    try {
      const hashPassword = await bcrypt.hash(password, 3)
      console.log('Crud.CreateUser.hashPassword::', hashPassword)
      const user = await prisma.users.create({
        data: {
          fullName : fullName,
          email: email,
          bithday: bithday,
          password: hashPassword,
        },
      });
      return user;

    } catch(e) {
      console.log(e.error)
    }
  } 

  async ReadUser(user_id) {
    console.log('reading the user...', user_id)
    try{
      const user = await prisma.users.findUniquie({
        where : {
          id : user_id
        },
        select : {
          id : true,
          email : true,
          fullName : true,
          bithday : true,
          profile : true
        }
      })
    } catch(e) {
      console,log(e.error)
    }
  }
}

module.exports = new Crud();