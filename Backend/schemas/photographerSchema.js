const Joi = require('joi');

const id = Joi.number().integer();
const portfolioUrl = Joi.string().pattern(/^\/photographers\/\d+$/).required(); // <- este es el cambio clave
const bio = Joi.string().max(500);
const status = Joi.string().valid('pending', 'approved', 'rejected');
const customerId = Joi.number().integer().required();
const imageUrl = Joi.string().uri().required();

const createPhotographerSchema = Joi.object({
  portfolioUrl,
  bio,
  status,
  customerId,
  imageUrl,
});

const updatePhotographerSchema = Joi.object({
  portfolioUrl,
  bio,
  status,
  imageUrl,
});

const getPhotographerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPhotographerSchema,
  updatePhotographerSchema,
  getPhotographerSchema,
};
