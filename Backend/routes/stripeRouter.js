
const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validatorHandler');
const StripeService = require('../services/stripeServices');

const router = express.Router();

const service = new StripeService();

router.post('/create-checkout-session',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const session = await service.createCheckoutSession(req.body.items, req.user.sub);
      res.json({ url: session.url });
    } catch (err) {
      next({ error: 'Error al crear la sesión de pago' });
    }
  }
);

module.exports = router;
