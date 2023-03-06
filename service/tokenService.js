const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken");


class TokenService{
GenerateToken  (payload) {
  const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{expiresIn:'30m'});
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{expiresIn:'30d'});
  return {accessToken : accessToken, refreshToken : refreshToken};
};

async saveToken(userId, refreshToken) {
  const tokenData = await prisma.tokens.findFirst({
    where : {
      user_id : userId
    }
  });
  console.log('tokenData:', tokenData)
  if (tokenData) {
    tokenData = await prisma.tokens.upsert({
      where: {
        user_id : userId
      },
      update: {
        refresh_token : refreshToken
      },
      select: {
        refresh_token: true
      }
    })
    return tokenData, console.log(tokenData)
  } else{

    const token = await prisma.tokens.create({
      data: {
        user: userId,
        refresh_token: refreshToken
      }
    })
    return token;
  };
};


};



module.exports = new TokenService();