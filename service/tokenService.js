const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken");


class TokenService{
GenerateToken  (payload) {
  const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{expiresIn:'30m'});
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{expiresIn:'30d'});
  return accessToken, refreshToken;
};

async saveToken(userId, refreshToken) {
  const tokenData = await prisma.tokens.findFirst({
    where : {
      user_id : userId
    }
  });
  if (tokenData) {
    tokenData.refresh_token = refreshToken;
    return tokenData.saveToken()
  };

  const token = await prisma.tokens.create({user: userId, refreshToken})
  return token;
};


};



module.exports = new TokenService();