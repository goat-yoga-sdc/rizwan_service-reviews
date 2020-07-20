const { Pool } = require('pg');
const PGpass = require('./password.js');

// 'ssl: true' for deployment??

const client = new Pool({
  user: 'rizwanchoudhury',
  password: PGpass,
  host: 'localhost',
  port: 5432,
  database: 'reviewmodule',
  max: 20
})


// let connection = async () => {
//   try {
//     console.log('connected to postgres client');
//   }
//   }
//   catch (err) {
//     console.log('error in postgreSQL/index.js', err);
//   }
//   finally {
//     console.log('ending client');
//     client.end();
//   }
// }

module.exports = client;