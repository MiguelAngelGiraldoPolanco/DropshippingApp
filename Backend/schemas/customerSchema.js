const Joi = require('joi');

const id = Joi.number().integer();
const lastName = Joi.string();
const name = Joi.string().min(3).max(30);
const phone = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string();
const address = Joi.string().min(3).max(100);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone,
  address,
  user: Joi.object({
    email: email.required(),
    password,
  })
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
  address,
  user: Joi.object({
    password
  })
});

const getCustomerSchema = Joi.object({
  id: id.required()
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
