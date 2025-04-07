const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
const { config } = require('./config/config');
const UserService = require('../services/usersServices');
const service = new UserService();


class AuthService {

  async getUser(email,password) {
    const user = await service.findByEmail(email);
      if (!user) {
        throw boom.unauthorized();
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw boom.unauthorized();
      }
      delete user.dataValues.password;
      return user;
  }

  signToken(user){
      const payload = {
        sub: user.id,
        scope: user.role
      }
      const token = jwt.sign(payload, config.jwtSecret, {
        expiresIn: '15m'
      });
      return({
        user,
        token
      });
  }

  async sendMail(email){
    const user = await service.findByEmail(email);
      if (!user) {
        throw boom.unauthorized();
      }
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: config.smtpUser, // generated ethereal user
        pass: config.smtpPassword, // generated ethereal password
      },
    });
    await transporter.sendMail({
        from: `"Maddison Foo Koch 👻" <${config.smtpUser}>`, // sender address
        to: `${user.email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      return { message: 'Email sent' };
  }
}

module.exports = AuthService;
