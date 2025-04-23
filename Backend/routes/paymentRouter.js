const express = require('express');
const passport = require('passport');

const PaymentService = require('../services/paymentService');
const { recordPaymentSchema, getPaymentSchema, getAllPaymentsSchema } = require('../schemas/paymentSchema');
const validatorHandler = require('../middlewares/validatorHandler');

const router = express.Router();
const service = new PaymentService();

router.get('/payments',
  passport.authenticate('jwt', { session: false }), // Autenticación de JWT
  validatorHandler(getAllPaymentsSchema, 'query'), // Validación del 'customerId' que recibimos como query
  async (req, res, next) => {
    try {
      const { customerId } = req.query; // Recuperamos el 'customerId' de los parámetros de la query
      const payments = await service.getAllPaymentsByCustomerId(customerId); // Usamos el servicio para obtener todos los pagos del cliente
      res.json(payments); // Retorna los pagos encontrados
    } catch (error) {
      next(error); // Manejamos el error si ocurre
    }
  });

router.get('/payment/:id',
  passport.authenticate('jwt', { session: false }), // Autenticación de JWT
  validatorHandler(getPaymentSchema, 'params'), // Validación del parámetro 'id'
  async (req, res, next) => {
    try {
      const { id } = req.params; // Recuperamos el 'id' del pago
      const payment = await service.getPaymentById(id); // Usamos el servicio para obtener el pago por ID
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' }); // Si no existe el pago
      }
      res.json(payment); // Retorna el pago encontrado
    } catch (error) {
      next(error); // Manejamos el error si ocurre
    }
  });

router.post('/payment',
  passport.authenticate('jwt', { session: false }), // Autenticación de JWT
  validatorHandler(recordPaymentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { orderId, amount, commissionRate, customerId, affiliateLink } = req.body;
      const payment = await service.recordPayment(orderId, amount, commissionRate, customerId, affiliateLink);
      res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  });



module.exports = router;
