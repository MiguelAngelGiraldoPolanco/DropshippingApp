const Joi = require('joi');

const id = Joi.number().integer();
const content = Joi.string().min(1).max(500).required();
const photographId = Joi.number().integer().required();
const customerId = Joi.number().integer().required();

const createCommentSchema = Joi.object({
  content,
  photographId,
  customerId,
});

const updateCommentSchema = Joi.object({
  content: Joi.string().min(1).max(500),
});

const getCommentSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCommentSchema,
  updateCommentSchema,
  getCommentSchema,
};
