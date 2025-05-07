const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
});

// Nuevo esquema para un producto dentro del array
const productItemSchema = Joi.object({
  productId: productId.required(),
  amount: amount.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  products: Joi.array().items(productItemSchema).min(1).required()
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});



module.exports = { getOrderSchema, createOrderSchema, addItemSchema, productItemSchema };
