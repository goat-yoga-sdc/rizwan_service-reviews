// These queries are currently not being used
const db = require('../index.js');

const model = {
  getUser: (id, callback) => {
    db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error('Error querying the DB for user');
        callback(err, null);
      } else { callback(null, result); }
    });
  },
  postAuth: ({ username, passHash }, callback) => {
    db.query(`SELECT passHash FROM users WHERE username="${username}"`, (err, result) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error('Error querying the DB for auth');
        callback(err, null);
        // if hashed password sent in post matches the one stored in the DB, send back success
      } else if (result[0].passHash === passHash) {
        callback(null, 'Successful login');
      } else {
        // if pass does not match, send back generic login error msg
        callback(null, 'Username and password do not match');
      }
    });
  },
};

module.exports = model;
