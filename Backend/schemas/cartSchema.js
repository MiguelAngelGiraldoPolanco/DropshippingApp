const Joi = require('joi');

const productSchema = Joi.object({
  productId: Joi.string().required(), // ID del producto
  quantity: Joi.number().integer().min(1).required(), // Cantidad del producto
  price: Joi.number().precision(2).required(), // Precio del producto
});

const createCartSchema = Joi.object({
  userId: Joi.string().required(), // ID del usuario
  products: Joi.array().items(productSchema).min(1).required(), // Lista de productos
});

const updateCartSchema = Joi.object({
  products: Joi.array().items(productSchema).min(1).required(), // Lista de productos a actualizar
});

const getCartSchema = Joi.object({
  userId: Joi.string().required(), // ID del usuario para obtener el carrito
});

module.exports = { createCartSchema, updateCartSchema, getCartSchema };
