const express = require("express");
const {
  insertTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoAPIs");
const { authentication } = require("../middleware/auth");
const { updateSchema, createTodoSchema } = require("../Schema/TodoSchema");
const { validate } = require("express-validation");

const todoRoutes = express.Router();

todoRoutes.use(authentication);

todoRoutes.get("/todo", getAllTodo);
todoRoutes.post("/todo", validate(createTodoSchema), insertTodo);
todoRoutes.put("/todo", validate(updateSchema), updateTodo);
todoRoutes.delete("/todo", deleteTodo);

module.exports = todoRoutes;
