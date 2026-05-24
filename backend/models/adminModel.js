const db = require('../db');
const bcrypt = require('bcrypt');

const Admin = {
  getAll: (callback) => {
    db.query('SELECT * FROM user', callback);
  },
  check: async (admin, callback) => {
    const { username, password } = admin;
    db.query(
      'SELECT * FROM user WHERE userName = ?',
      [username],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      }
    );
  },
};

module.exports = Admin;
