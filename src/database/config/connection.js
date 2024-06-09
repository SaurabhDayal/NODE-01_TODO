const { Pool } = require("pg/lib");

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'todo',
  port: 5433,
});

module.exports = pool