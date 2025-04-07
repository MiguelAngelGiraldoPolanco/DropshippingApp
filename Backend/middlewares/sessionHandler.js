const session = require('express-session');

function sessionHandler(req, res, next) {
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true }
  });
  next();
}

module.exports = sessionHandler;
