const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

class GetFromBD {

  async getByToken(token) {
    try {
      console.log("token accesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", token)
      const user_id = await prisma.tokens.findUnique({
        where: {
          access_token: token
        },
        select: {
          user_id: true,
        },
      });
      console.log('getByToken => ID:', user_id)


      return user_id
    } catch (e) {
      console.log(e.error)
    }
  };

  async getByMail(Email) {
    console.log('=======================================================================')
    console.log('getByMail::', Email)
    const Person = await prisma.users.findUnique({
      where: {
        email: Email
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        bithday: true,
        password: true,
        role: true,
        token: true,
        isActivated: true
      }
    })
    console.log("result getByMail::", Person)
    console.log('=======================================================================')
    return Person;
  }



  async getByPhone(Phone) {
    console.log('=======================================================================')
    console.log('getByPhone::', Phone)
    const User = await prisma.users.findUnique({
      where: {
        phone: Phone
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        bithday: true,
        password: true,
        role: true,
        token: true,
        isActivated: true
      }
    })
    console.log('result getByPhone::', Phone)
    console.log('=======================================================================')
    return User
  };

  async getById(ID) {
    const User = await prisma.users.findUnique({
      where: {
        id: ID
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        user_name: true,
        phone: true,
        about_me: true,
        bithday: true,
        city: true,
        work: true,
        music: true,
        subscription: true,
        password: true,
        role: true,
        token: true,
        isActivated: true
      },

    })

    return User
  };


  async getAll() {
    console.log('щас будет много всего')
    try {
      const getAll = await prisma.users.findMany()
      console.log('GET_ALL::', getAll)
      return getAll
    } catch (e) {
      console.log(e)
    }
  };

  async getAllTokens() {
    console.log('щас будет много всего')
    try {
      const getAll = await prisma.tokens.findMany()
      console.log('GET_ALL::', getAll)
      return getAll
    } catch (e) {
      console.log(e)
    }
  };





}

module.exports = new GetFromBD();