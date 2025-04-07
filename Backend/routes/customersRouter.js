const express = require('express');
const passport = require('passport');
const CustomersService = require('../services/customersServices');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customerSchema');
const validatorHandler = require('../middlewares/validatorHandler');

const router = express.Router();
const service = new CustomersService();

// Registrar un cliente (crear cuenta)
router.post('/register',
  validatorHandler(createCustomerSchema, "body"), // Validar los datos del cliente
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body); // Crear usuario y cliente
      res.status(201).json(newCustomer); // Devolver respuesta
    } catch (error) {
      next(error);
    }
});

// Iniciar sesión (autenticación)
router.post('/login',
  passport.authenticate('local', { session: false }), // Usar autenticación Passport (local)
  async (req, res, next) => {
    try {
      const user = req.user;  // Usuario autenticado
      const token = service.signToken(user);  // Generar token JWT
      res.json({ token });  // Devolver el token
    } catch (error) {
      next(error);
    }
});

// Obtener información del cliente (requiere autenticación)
router.get('/:id',
  passport.authenticate('jwt', { session: false }),  // Asegurarse de que el usuario esté autenticado
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id); // Obtener datos del cliente
      res.json(customer);
    } catch (error) {
      next(error);
    }
});

// Actualizar la información del cliente (requiere autenticación)
router.patch('/:id',
  passport.authenticate('jwt', { session: false }), // Requiere autenticación
  validatorHandler(updateCustomerSchema, "body"),  // Validar los datos de actualización
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedCustomer = await service.update(id, body);  // Actualizar la información del cliente
      res.json(updatedCustomer);
    } catch (error) {
      next(error);
    }
});

// Eliminar cuenta de cliente (opcional, si es necesario)
router.delete('/:id',
  passport.authenticate('jwt', { session: false }), // Requiere autenticación
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await service.delete(id); // Eliminar cliente
      res.json(result);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
