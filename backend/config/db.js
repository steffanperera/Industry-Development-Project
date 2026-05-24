const mysql = require('mysql2');
require('dotenv').config();

// create connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'careable',
});

// connect
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('MySQL Connected...');
  }
});

module.exports = db;
