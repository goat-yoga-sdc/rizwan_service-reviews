const { Pool } = require('pg');
const { user, password } = require('./credentials.js');

const client = new Pool({
  user: user,
  password: password,
  host: 'localhost',
  port: 5432,
  database: 'reviews_db',
  max: 20,
});

module.exports = client;
