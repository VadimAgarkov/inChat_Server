const secret = require('./jwt_key.js')

const generateToken = (id, email) => {
  const payload = {
    id: id,
    email: email
  }
  return jwt.sign(payload, secret, {expiresIn: '12h'});
}

module.exports= generateToken;