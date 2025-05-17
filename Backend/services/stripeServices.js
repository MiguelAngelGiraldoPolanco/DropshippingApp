const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripeService {
  constructor() {}

  async createCheckoutSession(items, userId) {
    // Convertir los items en un formato que Stripe pueda entender
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Convertir a centavos
      },
      quantity: item.quantity,
    }));

    try {
      // Crear la sesión de pago en Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/cart?success=true',
        cancel_url: 'http://localhost:5173/cart?canceled=true',
        metadata: {
          userId: userId.toString(), // El userId como string
          items: JSON.stringify(
            items.map(item => ({
              productId: item.id,
              quantity: item.quantity
            }))
          ),
        },
      });

      return session; // Devolver la URL de la sesión de pago
    } catch (err) {
      console.error('Stripe error:', err.message);
      console.error(err.stack);
    }
  }
}

module.exports = StripeService;
