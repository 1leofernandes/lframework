const Joi = require('joi');

class BaseValidation {
  constructor(schema) {
    this.schema = schema;
    this.create = Joi.object({
      ...this.schema,
      id: Joi.forbidden(),
      createdAt: Joi.forbidden(),
      updatedAt: Joi.forbidden()
    });

    this.update = Joi.object({
      ...this.schema,
      id: Joi.forbidden(),
      createdAt: Joi.forbidden(),
      updatedAt: Joi.forbidden()
    }).min(1);
  }
}

module.exports = BaseValidation;
