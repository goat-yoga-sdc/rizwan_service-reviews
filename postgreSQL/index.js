const { Client } = require('pg');
const PGpass = require('./password.js');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  password: PGpass,
})

let connection = async () => {
  try {
    await client.connect();
    console.log('connected to postgres client');
  }
  catch (err) {
    console.log('error in postgreSQL/index.js', err);
  }
  finally {
    console.log('ending client')
    client.end();
  }
}

connection();