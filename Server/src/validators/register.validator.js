const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
  name: Joi.string().min(3).required(),
});

module.exports = registerSchema;
