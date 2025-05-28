const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
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
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.customer?.name, // ✅ devolvemos el nombre del modelo relacionado
        },
        token
      });
  }

  async sendRecovery(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {sub: user.id};
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '15min'
    });
    const link = `http://localhost:3005/api/v1/recovery?token=${token}`;
    await service.update(user.id, {
      recoveryToken: token,
    });
    const mail = {
      from: `"Maddison Foo Koch 👻" <${config.smtpUser}>`, // sender address
        to: `${user.email}`, // list of receivers
        subject: "Email para recuperar contraseña", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Ingresa a este link => ${link}</b>`, // html body
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hashPassword = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {
        recoveryToken: null,
        password: hashPassword
      });
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail){
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
    await transporter.sendMail(infoMail);
      return { message: 'Email sent' };
  }
}

module.exports = AuthService;
