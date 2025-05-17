const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const WebhookService = require('../services/webhookServices');

const router = express.Router();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const service = new WebhookService();

router.post('/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    console.log('🚀 Webhook POST received');

  const sig = req.headers['stripe-signature'];
  const payload = req.body;

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log('Evento recibido:', event.type);

    if (event.type === 'checkout.session.completed') {
      console.log('Metadata del objeto:', event.data.object.metadata);
      await service.handleSuccessfulPayment(event);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Error en webhook:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;
