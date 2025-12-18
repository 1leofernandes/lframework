const Joi = require('joi');

const userValidation = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required(),
  isActive: Joi.boolean().optional()
};

module.exports = userValidation;
