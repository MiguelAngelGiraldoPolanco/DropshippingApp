const express = require('express');
const { createCartSchema, updateCartSchema, getCartSchema } = require('../schemas/cartSchema');
const validatorHandler = require('../middlewares/validatorHandler');
const CartService = require('../services/cartService');
const passport = require('passport');

const router = express.Router();
const cartService = new CartService();

// Crear un carrito
router.post('/',
  passport.authenticate('jwt', { session: false }),  // Autenticación de JWT
  validatorHandler(createCartSchema, 'body'),
  async (req, res, next) => {
    try {
      const { userId, products } = req.body;
      const cart = await cartService.createCart(userId, products);
      res.status(201).json(cart);
    } catch (error) {
      next(error);
    }
  }
);

// Obtener el carrito de un usuario
router.get('/:userId',
  passport.authenticate('jwt', { session: false }),  // Autenticación de JWT
  validatorHandler(getCartSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const cart = await cartService.getCart(userId);
      res.json(cart);
    } catch (error) {
      next(error);
    }
  }
);

// Actualizar el carrito de un usuario
router.patch('/:userId',
  passport.authenticate('jwt', { session: false }),  // Autenticación de JWT
  validatorHandler(getCartSchema, 'params'),
  validatorHandler(updateCartSchema, 'body'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { products } = req.body;
      const updatedCart = await cartService.updateCart(userId, products);
      res.json(updatedCart);
    } catch (error) {
      next(error);
    }
  }
);

// Eliminar el carrito de un usuario
router.delete('/:userId',
  passport.authenticate('jwt', { session: false }),  // Autenticación de JWT
  validatorHandler(getCartSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const result = await cartService.deleteCart(userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
