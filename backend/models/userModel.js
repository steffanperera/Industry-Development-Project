const db = require('../db');
const bcrypt = require('bcrypt');


const User = {
    getAll: (callback) => {
        db.query('SELECT * FROM caregivers', callback);
    },
    check: async (User, callback) => {
        const { username,password} = User;
        //const hashedPassword = await bcrypt.hash(password, 10);
        //db.query('UPDATE users SET password= $1',[hashedPassword]);
        db.query('SELECT * FROM user WHERE userName = ?', [username], 
            (err, results) => {
    //console.log(err);
    if (err) return callback(err, null);

    //console.log(results); 
    
    callback(null, results);
  }
        );
    },

    SaveUser: async (data,password,userrole, callback) => {
  try {
  //console.log("pw "+hashedPassword);
  const sql = `
    INSERT INTO user 
    (userName,
password,
userRole,status)
    VALUES (?, ?, ?,?)
  `;

  const values = [
    data.email,
    password,
    userrole,'1'
  ];

  db.query(sql, values, (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId);
  });

  } catch (error) {
    callback(error, null);
  }
}
};


module.exports = User;