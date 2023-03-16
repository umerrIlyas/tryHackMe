const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),
  duration: Joi.date().required(),
});

module.exports = taskSchema;
