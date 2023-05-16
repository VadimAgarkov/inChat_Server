const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken");


class TokenService {

  GenerateToken(payload) {
    let tokens = {
      access_token: '',
      refresh_token: ''
    }
    const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30d' });

    return tokens = { access_token: accessToken, refresh_token: refreshToken }
  };




  async saveRefreshToken(userId, refresh_token) {

    console.log('1...save token:', userId, refresh_token)

    let tokenData = await prisma.tokens.count({
      where: {
        user_id: userId
      },
      // select: {
      //   user_id: true,
      //   refresh_token: true
      // }
    });

    console.log('2...tokenData:', tokenData)

    if (tokenData) {
      console.log('3...tokenData => upsert');
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
      console.log("4...upsert refresh_token:", 'id:', userId, 'token', refresh_token)

    } else {
      console.log('3...tokenData => create');

      const token = await prisma.tokens.create({
        data: {
          user_id: userId,
          refresh_token: refresh_token
        }
      })
      return token, console.log('4...Create Accesstoken was finished', token);
    };
  };


  async saveAccessToken(userId, access_token) {

    console.log('save token:', userId, access_token)

    let tokenData = await prisma.tokens.count({
      where: {
        user_id: userId
      },
      // select: {
      //   user_id: true,
      //   refresh_token: true
      // }
    });
    console.log('tokenData:', tokenData)
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
      console.log("upsert access_token:", 'id:', userId, 'token', access_token)

    } else {

      const token = await prisma.tokens.create({
        data: {
          user_id: userId,
          access_token: access_token
        }



      })
      return token, console.log('Create Accesstoken was finish', token);
    };
  };


  async checkAccessToken(access_token) {
    const tokenData = await prisma.tokens.findUnique({
      where: {
        access_token: access_token
      },
      select: {
        user_id: true
        // refresh_token: true
      }
    });
    console.log('token data', tokenData)

    if (tokenData == null) {
      return null
    }

    return tokenData.user_id;
  };
};

module.exports = new TokenService();