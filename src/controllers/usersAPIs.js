const pool = require("../database/config/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const salt = 10;
const secretKey = "secret";

const registerUsers = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, salt);
  const registerQuery = `INSERT INTO users (name , email , password) VALUES ($1,$2,$3)`;
  try {
    const result = await pool.query(registerQuery, [name, email, hashPassword]);
    res.status(200).json({
      message: "successfully created",
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  let ischecked = false;
  const { email, password } = req.body;
  const getDetailsQuery = `SELECT id, email, password FROM users WHERE email=$1`;
  try {
    const { rows } = await pool.query(getDetailsQuery, [email]);
    bcrypt.compare(password, rows[0].password, (_, result) => {
      if (result) {
        const payload = { id: rows[0].id, expiryTime: "1h" };
        jwt.sign(payload, secretKey, (err, token) => {
          if (err) {
            return res.status(500).json({
              message: "Internal Server Error",
              error: err.message,
            });
          }
          res.status(200).json({
            message: "loged-in successfully",
            token,
          });
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUsers, loginUser, secretKey };
