const Joi = require('joi');

// Campos existentes
const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(1);
const image = Joi.string().uri();
const description = Joi.string().min(10);
const categoryId = Joi.number().integer();

// Nuevos campos
const estado = Joi.string().valid('Nuevo', 'Usado', 'Restaurado').required(); // Asegura que el estado sea uno de estos valores
const marca = Joi.string().min(2).max(50).required(); // Marca debe ser una cadena de texto no vacía
const modelo = Joi.string().min(1).max(50).required(); // El modelo también debe ser una cadena válida

// Filtros
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
  estado: estado,  // Agregado
  marca: marca,     // Agregado
  modelo: modelo    // Agregado
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId,
  estado,  // Agregado
  marca,   // Agregado
  modelo   // Agregado
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit: Joi.number().integer().optional(),
  offset: Joi.number().integer().optional(),
  price: Joi.number().optional(),
  price_min: Joi.number().optional(),
  price_max: Joi.number().optional(),
  estado: Joi.string().optional(), // Ahora es opcional
  marca: Joi.string().optional(),  // Ahora es opcional
  modelo: Joi.string().optional(), // Ahora es opcional
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
