const axios = require('axios');
const boom = require('@hapi/boom');
const Payment = require('../models/Payment'); // El modelo de pago para tu base de datos

class PaymentService {
  // Aquí se podría recibir la comisión por venta de AliExpress
  async recordPayment(orderId, amount, commissionRate, customerId, affiliateLink) {
    try {
      const payment = new Payment({
        orderId,
        amount,
        commissionRate,
        paymentDate: new Date(),
        status: 'completed',  // Esto podría depender de la respuesta de AliExpress
        customerId,
        affiliateLink
      });

      await payment.save();  // Guardar la información en tu base de datos

      return payment;
    } catch (error) {
      throw boom.badImplementation('Error while recording the payment');
    }
  }

  async getPaymentById(id) {
    try {
      const payment = await Payment.findById(id); // Busca el pago por su ID en la base de datos
      return payment; // Si se encuentra, lo retorna
    } catch (error) {
      throw new Error('Payment not found');
    }
  }

  async getAllPaymentsByCustomerId(customerId) {
    try {
      const payments = await Payment.find({ customerId }); // Busca todos los pagos que coincidan con el customerId
      return payments; // Si se encuentran pagos, los retorna
    } catch (error) {
      throw new Error('Error fetching payments for customer');
    }
  }

  // Otros métodos como verificar pagos, actualizar estado de pagos, etc.
}

module.exports = PaymentService;
