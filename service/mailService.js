const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


class mailService {
  async sendActivationMail(to, link) {
    return console.log('sendaactivlink ok')
  };

  async generateLink() {
    console.log('Generate LINK.....................')
  };
};

module.exports = new mailService();