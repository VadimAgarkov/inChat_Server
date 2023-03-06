const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

class GetFromBD{
  
  async getAll(req, res) {
    try{
      const getAll = await prisma.users.findMany()
      return getAll
    } catch(e){
      console.log(e)
    }
  };
}

module.exports = new GetFromBD();

