const db = require('../db');
const bcrypt = require('bcrypt');


const User = {
    getAll: (callback) => {
        db.query('SELECT * FROM user', callback);
    },
    check: async (User, callback) => {
        const { username,password} = User;
        //const hashedPassword = await bcrypt.hash(password, 10);
        //db.query('UPDATE users SET password= $1',[hashedPassword]);
        db.query('SELECT * FROM user WHERE userName = ?', [username], 
            (err, results) => {
    //console.log(err);
    if (err) return callback(err, null);

   // console.log(results); 
    
    callback(null, results);
  }
        );
    }
};

module.exports = User;