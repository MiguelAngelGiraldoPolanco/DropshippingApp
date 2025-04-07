const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const recoverySchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = { loginSchema, recoverySchema };
