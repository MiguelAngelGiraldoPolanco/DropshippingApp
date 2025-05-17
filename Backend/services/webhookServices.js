const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class WebhookService {
  constructor() {}

  async handleSuccessfulPayment(event) {
    try {
      const session = event.data.object;

      const metadata = session.metadata;

      if (!metadata || !metadata.userId || !metadata.items) {
        throw boom.badRequest('Faltan datos en metadata de la sesión de Checkout');
    }
      const userId = parseInt(metadata.userId, 10);
      const items = JSON.parse(metadata.items);

      const customer = await models.Customer.findByPk(userId);
    if (!customer) {
      throw boom.badRequest(`El customer con id ${userId} no existe`);
    }

    const newOrder = await models.Order.create({
      customerId: customer,
      products: items, // JSONB
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
