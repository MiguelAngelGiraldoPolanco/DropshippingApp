const Joi = require('joi');

// Campos base
const id = Joi.number().integer();
const name = Joi.string().min(3).max(100);
const price = Joi.number().integer().min(1);
const image = Joi.string().uri();
const description = Joi.string().min(10);
const categoryId = Joi.number().integer();

// Nuevos campos del modelo
const estado = Joi.string().valid('Nuevo', 'Usado', 'Restaurado');
const marca = Joi.string().min(2).max(50);
const modelo = Joi.string().min(1).max(50);
const fabricacion = Joi.number().integer().min(1800).max(new Date().getFullYear());
const stock = Joi.number().integer().min(0);
const createdAt = Joi.date(); // Solo se usaría en GETs o lecturas

// Filtros
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  fabricacion: fabricacion.required(),
  image: image.required(),
  description: description.required(),
  stock: stock.required(),
  estado: estado.required(),
  marca: marca.required(),
  modelo: modelo.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name,
  price,
  fabricacion,
  image,
  description,
  stock,
  estado,
  marca,
  modelo,
  categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max,
  estado,
  marca,
  categoryId,
  modelo,
}).with('price_min', 'price_max') // Si hay price_min, debe haber price_max
  .with('price_max', 'price_min') // Y viceversa
  .custom((value, helpers) => {
    if (value.price_min && value.price_max && value.price_min > value.price_max) {
      return helpers.message('"price_min" debe ser menor o igual que "price_max"');
    }
    return value;
  });

const bulkCreateProductSchema = Joi.array().items(createProductSchema).min(1);

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
  bulkCreateProductSchema,
};
