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

  async UpdateUser(user_id, update_fields, select) {
    console.log('Update the User data...')
    try {
      const newData = await prisma.users.update({
        where : {
          id : user_id
        }, 
        update : update_fields,
        select : select
      
      })
    } catch(e) {

    }
  }

  async DeleteUser(user_id) {
    console.log("delete the user");
    try{
      const deleteUser = await prisma.users.delete({
        where : {
          id : user_id
        }
      })
    } catch(e) {
      console.log(e.error)
    }
  } 
}

module.exports = new Crud();