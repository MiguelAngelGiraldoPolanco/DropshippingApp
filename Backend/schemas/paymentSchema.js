const Joi = require('joi');

const paymentSchema = Joi.object({
  orderId: Joi.string().required(),   // ID del pedido realizado (puede ser de AliExpress)
  amount: Joi.number().required(),    // Comisión que recibirás (en porcentaje o monto específico)
  commissionRate: Joi.number().required(),  // El porcentaje de la comisión que recibiste
  paymentDate: Joi.date().required(),  // Fecha de la transacción
  status: Joi.string().valid('pending', 'completed').required(),  // Estado de la comisión (pendiente o completado)
  customerId: Joi.string().required(),  // ID del cliente que realizó la compra (en tu sistema)
  affiliateLink: Joi.string().required(),  // Enlace de afiliado utilizado
});



const getPaymentSchema = Joi.object({
  id: Joi.string().required(), // El id debe ser un string no vacío
});

const getAllPaymentsSchema = Joi.object({
  customerId: Joi.string().required(), // El 'customerId' debe ser un string no vacío
});

module.exports = paymentSchema , getPaymentSchema, getAllPaymentsSchema;
