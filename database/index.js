const dbPass = require('./dbConfig.js');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: dbPass,
  database: 'reviewModule'
});

connection.connect(err =>{
  if (err) { console.error('Error connecting:' + err.stack); } else { console.log('DB connected as ID :' + connection.threadId); }
});

module.exports = connection;