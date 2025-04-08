const Joi = require('joi');

const productResponseSchema = Joi.object({
  productId: Joi.string().required(), // ID único del producto de AliExpress
  name: Joi.string().required(), // Nombre del producto
  description: Joi.string().required(), // Descripción del producto
  price: Joi.number().positive().required(), // Precio del producto
  stock: Joi.number().integer().min(0).required(), // Stock disponible
  imageUrl: Joi.string().uri().required(), // URL de la imagen
  category: Joi.string().required(), // Categoría del producto
  provider: Joi.string().valid('AliExpress').required(), // AliExpress como proveedor
});

module.exports = productResponseSchema;
