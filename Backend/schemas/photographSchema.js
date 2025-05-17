const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string().min(3).max(100).required();
const description = Joi.string().max(1000).required();
const imageUrl = Joi.string().uri().required();
const photographerId = Joi.number().integer().required();

const createPhotographSchema = Joi.object({
  title,
  description,
  imageUrl,
  photographerId,
});

const updatePhotographSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().max(1000),
  imageUrl: Joi.string().uri(),
});

const getPhotographSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPhotographSchema,
  updatePhotographSchema,
  getPhotographSchema,
};
