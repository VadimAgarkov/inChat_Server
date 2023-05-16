const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

class GetFromBD {

  async getByToken(token) {
    try {
      const user_id = await prisma.tokens.findUnique({
        where: {
          access_token: token
        },
        select: {
          user_id: true,
        },
      });
      return user_id
    } catch (e) {
      console.log(e.error)
    }
  };

  async getByMail(Email) {
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
    return Person;
  }

  async getByPhone(Phone) {
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
    return User;
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
    });
    return User;
  };

  async getAll() {
    try {
      const getAll = await prisma.users.findMany();
      return getAll;
    } catch (e) {
      console.log(e);
    }
  };

  async getAllTokens() {
    try {
      const getAll = await prisma.tokens.findMany();
      return getAll;
    } catch (e) {
      console.log(e);
    }
  };
};

module.exports = new GetFromBD();