const Joi = require('joi');

const id = Joi.number().integer();
const score = Joi.number().integer().min(1).max(5).required();
const photographId = Joi.number().integer().required();
const customerId = Joi.number().integer().required();

const createRatingSchema = Joi.object({
  score,
  photographId,
  customerId,
});

const updateRatingSchema = Joi.object({
  score: Joi.number().integer().min(1).max(5),
});

const getRatingSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createRatingSchema,
  updateRatingSchema,
  getRatingSchema,
};
