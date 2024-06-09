const express = require("express");
const { registerUsers, loginUser } = require("../controllers/usersAPIs");
const { validate } = require("express-validation");
const { registerSchema, loginSchema } = require("../Schema/userSchema");
const userRouters = express.Router();

userRouters.post("/user/register",validate(registerSchema) ,registerUsers);
userRouters.post("/user/login", validate(loginSchema),loginUser)

module.exports = userRouters;
