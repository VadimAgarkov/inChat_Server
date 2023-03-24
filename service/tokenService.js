const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken");


class TokenService{

 GenerateToken (payload) {
  let tokens = {
    access_token: '',
    refresh_token: ''
  }
  const refreshToken =  jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{expiresIn:'30m'});
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{expiresIn:'30d'});

  return  tokens= { access_token: accessToken, refresh_token: refreshToken }
  };

  async saveToken(userId, refresh_token) {
    const tokenData = await prisma.tokens.count({
      where : {
          user : userId
      }
    });
    console.log('tokenData:', refresh_token)
    if (tokenData) {
      tokenData = await prisma.tokens.upsert({
        where: {
          user_id : userId
        },
        update: {
          refresh_token : refresh_token
        },
        select: {
          refresh_token : true
        }
      });
      return tokenData
    } 

    const token = await prisma.tokens.create({
      data: {
        user: userId,
        refresh_token: refresh_token
      }
    })
    return token;
  
  };


  async checkAccessToken(accessToken) {
    const findUserWithToken = await prisma.tokens.findUnique({
      where: {
        access_token: accessToken
      }
    })
    return findUserWithToken;
  };

};



module.exports = new TokenService();