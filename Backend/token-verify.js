const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;


function verifyToken(token,secret) {
  return jwt.verify(token, secret);
}


const payload = verifyToken(token, secret);
console.log(payload);
