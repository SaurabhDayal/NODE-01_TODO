const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./src/database/config/connection");
const todoRoutes = require("./src/Routes/todoRoutes");
const userRouters = require("./src/Routes/userRoutes");
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(userRouters);
app.use(todoRoutes);

app.use((error, req, res, next) => {
  if (error.status && error.status !== 500) {
    res.status(error.status).send(error);
    return;
  }

  res.status(500).json({
    message: "internal server error",
    error: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`PORT is running on ${PORT}`);
});
