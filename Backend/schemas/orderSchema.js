const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const status = Joi.string().valid('pending', 'processing', 'shipped', 'completed', 'cancelled'); // Puedes extender los estados
const total = Joi.number().integer().min(0);
const createdAt = Joi.date();
const updatedAt = Joi.date();

// Producto dentro de una orden (array)
const productItemSchema = Joi.object({
  productId: productId.required(),
  amount: amount.required(),
});

// Crear orden
const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  products: Joi.array().items(productItemSchema).min(1).required(),
  status,      // Opcional en creación, por si deseas sobreescribir el default "pending"
  total        // Opcional, normalmente lo calcula el backend, pero se permite si lo gestionas tú
});

// Agregar producto a orden existente
const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

// Obtener orden (por ID) — extendido para incluir datos adicionales si se necesita en el futuro
const getOrderSchema = Joi.object({
  id: id.required(),
  includeProducts: Joi.boolean(),   // útil si quieres incluir productos en una consulta futura
});

// (Opcional) Para búsquedas o filtros, si los implementas:
const queryOrderSchema = Joi.object({
  customerId,
  status,
  createdAt,
  updatedAt,
  limit: Joi.number().integer(),
  offset: Joi.number().integer()
});

module.exports = {
  createOrderSchema,
  addItemSchema,
  getOrderSchema,
  productItemSchema,
  queryOrderSchema // opcional, solo si piensas hacer filtrado
};
