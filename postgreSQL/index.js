const { Pool } = require('pg');
const PGpass = require('./password.js');

// 'ssl: true' for deployment??

const client = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  password: PGpass
})

let connection = async () => {
  try {
    console.log('connected to postgres client');
  }
  catch (err) {
    console.log('error in postgreSQL/index.js', err);
  }
  finally {
    console.log('ending client');
    client.end();
  }
}

connection();