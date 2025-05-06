
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


// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
router.post('/webhook', express.json({type: 'application/json'}), (req, res, next) => {
  const event = req.body;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});


module.exports = router;
