const { Joi } = require("express-validation");

const createTodoSchema = {
  body: Joi.object({
    todoValue: Joi.string().required(),
  }).required(),
};

const updateSchema = {
  body: Joi.object({
    id: Joi.string().required(),
    todoValue: Joi.string().required(),
    isCompleted: Joi.boolean().required(),
  }).required(),
};

module.exports = { createTodoSchema, updateSchema };
