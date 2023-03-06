const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


class mailService {
  async sendActivationMail(to, link) {
    console.log('SENDING ACTIVATION MAIL.......................................................... ')
    return console.log('sendaactivlink ok')
  };

  async generateLink() {
    console.log('Generate LINK.....................')
  };
};

module.export = new mailService();