
const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const validatorHandler = require('../middlewares/validatorHandler');
const StripeService = require('../services/stripeServices');
const userService = require('../services/usersServices');
const { clerkClient, requireAuth, getAuth } = require('@clerk/express');
const { Error } = require('sequelize');

const router = express.Router();

const service = new StripeService();
const userServiceInstance = new userService();

router.post('/create-checkout-session',
  requireAuth(),
  async (req, res, next) => {
    try {
       // Obtener el email o sub del token de Clerk (depende del campo que usas)
      const { email, items } = req.body;  // email y items enviados desde el frontend

      if (!email) {
        return next(boom.badRequest('El correo electrónico es obligatorio'));
      }

      console.log('Email del usuario:', email);
    // Buscar el usuario en tu base de datos utilizando el email o sub
    const user = await userServiceInstance.findByEmail(email);

    if (!user) {
      return next(boom.notFound('Usuario no encontrado'));
    }

    const session = await service.createCheckoutSession(items, user.id);

      res.json({ url: session.url });
    } catch (err) {
      next(boom.badImplementation(`Error al crear la sesión de pago: ${err.message}`));
    }
  }
);


module.exports = router;
