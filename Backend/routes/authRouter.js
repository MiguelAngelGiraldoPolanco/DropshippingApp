const express = require('express');
const passport = require('passport');

const { loginSchema, recoverySchema } = require('../schemas/authSchemas');  // Importando los esquemas
const validatorHandler = require('../middlewares/validatorHandler'); // Suponiendo que tienes un middleware de validación
const AuthService = require('../services/authServices');

const router = express.Router();
const service = new AuthService();

router.post('/login',
  validatorHandler(loginSchema, 'body'), // Validación del esquema de login
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
  }
});

router.post('/recovery',
  validatorHandler(recoverySchema, 'body'), // Validación del esquema de recuperación
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendMail(email);
      res.json(rta);
    } catch (error) {
      next(error);
  }
});


module.exports = router;
