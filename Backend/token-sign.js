const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const payload = {
  sub: 1,
  scope: 'admin',
  role: 'admin',
}

function signToken(payload,secret) {
  return jwt.sign(payload, secret);
}


const token = signToken(payload, secret);
console.log(token);
