const mysql = require('mysql');
const dbPass = require('./dbConfig.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: dbPass,
  database: 'reviewModule',
});

connection.connect((err) => {
  // eslint-disable-next-line no-console
  if (err) { console.error(`Error connecting:${err.stack}`); } else { console.log(`DB connected as ID :${connection.threadId}`); }
});

module.exports = connection;
