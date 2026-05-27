const db = require('../db');
const bcrypt = require('bcrypt');

const User = {
    getAll: (callback) => {
        db.query('SELECT * FROM user', callback);
    },
    check: async (User, callback) => {
        const { username, password } = User;
        db.query('SELECT * FROM user WHERE userName = ? AND userRole="ADMIN"', [username],
            (err, results) => {
                if (err) return callback(err, null);
                callback(null, results);
            }
        );
    }
};

module.exports = User;
