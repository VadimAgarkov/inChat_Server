const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');


class TokenService {

  generateToken(payload) {
    let tokens = {
      access_token: '',
      refresh_token: ''
    }
    const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30d' });
    return tokens = { access_token: accessToken, refresh_token: refreshToken }
  };

  async saveRefreshToken(userId, refresh_token) {
    let tokenData = await prisma.tokens.count({
      where: {
        user_id: userId
      },
    });
    if (tokenData) {
      tokenData = await prisma.tokens.upsert({
        where: {
          user_id: userId
        },
        update: {
          refresh_token: refresh_token
        },
        create: {
          user_id: userId,
          refresh_token: refresh_token,
        },
        select: {
          user_id: true,
          refresh_token: true
        },
        select: {
          refresh_token: true
        }
      });
    } else {
      const token = await prisma.tokens.create({
        data: {
          user_id: userId,
          refresh_token: refresh_token
        }
      })
      return token;
    };
  };

  async saveAccessToken(userId, access_token) {
    let tokenData = await prisma.tokens.count({
      where: {
        user_id: userId
      },
    });
    if (tokenData) {
      tokenData = await prisma.tokens.upsert({
        where: {
          user_id: userId
        },
        update: {
          access_token: access_token
        },
        create: {
          user_id: userId,
          access_token: access_token,
        },
        select: {
          user_id: true,
          access_token: true
        }
      });
    } else {
      const token = await prisma.tokens.create({
        data: {
          user_id: userId,
          access_token: access_token
        },
      })
      return token;
    };
  };


  async checkAccessToken(access_token) {
    const tokenData = await prisma.tokens.findUnique({
      where: {
        access_token: access_token
      },
      select: {
        user_id: true
      }
    });
    if (tokenData == null) {
      return null
    }
    return tokenData.user_id;
  };
};

module.exports = new TokenService();