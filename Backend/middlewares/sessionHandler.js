const session = require('express-session');

function sessionHandler(req, res, next) {
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }
  });
  next();
}

module.exports = sessionHandler;
