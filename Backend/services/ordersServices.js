const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){}

  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    });
    if (!customer) {
      throw boom.badRequest('Customer not found');
    }
    const newOrder = await models.Order.create({ customerId: customer.id });
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        {
          association: 'orderProducts',
          include: ['product'] // Esto traerá los productos de cada línea
        }
      ]
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        {
          association: 'orderProducts',
          include: ['product'] // Productos asociados a cada línea de orden
        }
      ]
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        {
          association: 'orderProducts',
          include: ['product']
        }
      ]
    });
    return orders;
  }

  async update(id, changes) {
    const order = await models.Order.findByPk(id);
    if (!order) {
      throw boom.notFound('Order not found');
    }
    const updated = await order.update(changes);
    return updated;
  }

  async delete(id) {
    const order = await models.Order.findByPk(id);
    if (!order) {
      throw boom.notFound('Order not found');
    }
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;
