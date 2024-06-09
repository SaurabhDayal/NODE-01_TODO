const { Joi } = require("express-validation");

const registerSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
};

const loginSchema = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
};


module.exports = {registerSchema, loginSchema}