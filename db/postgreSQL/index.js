const { Pool } = require("pg");
const { user, password } = require("./password.js");

const client = new Pool({
  user: user,
  password: password,
  host: "localhost",
  port: 5432,
  database: "reviewmodule",
  max: 20,
});

module.exports = client;
