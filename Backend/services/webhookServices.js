const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class WebhookService {
  constructor() {}

  async handleSuccessfulPayment(event) {
    try {
      const session = event.data.object;

      const metadata = session.metadata;

      if (!metadata || !metadata.customerId || !metadata.products) {
        throw boom.badRequest('Faltan datos en metadata del PaymentIntent');
      }

      const customerId = parseInt(metadata.customerId, 10);
      const products = JSON.parse(metadata.products);

      const newOrder = await models.Order.create({
        customerId,
        products, // se guarda como JSONB
        status: 'completed',
      });

      for (const item of products) {
        await models.OrderProduct.create({
          orderId: newOrder.id,
          productId: item.productId,
          amount: item.amount,
        });
      }

      return { success: true, orderId: newOrder.id };

    } catch (error) {
      console.error('Error procesando el webhook:', error);
      throw boom.internal('Error al procesar el webhook');
    }
  }
}

module.exports = WebhookService;
