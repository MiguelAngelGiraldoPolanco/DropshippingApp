const Joi = require('joi');

// Esquema para una categoría individual
const categorySchema = Joi.object({
  categoryId: Joi.string().required(), // ID único de la categoría
  name: Joi.string().required(), // Nombre de la categoría
  parentId: Joi.string().optional(), // ID de la categoría principal, si es una subcategoría
  description: Joi.string().optional(), // Descripción opcional de la categoría
});

// Esquema para la respuesta de las categorías (puede ser una lista de categorías)
const categoriesResponseSchema = Joi.array().items(categorySchema);

module.exports = { categoriesResponseSchema };
