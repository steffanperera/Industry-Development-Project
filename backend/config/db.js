const mysql = require("mysql2");

// create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // your mysql password
  database: "careable"
});

// connect
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("MySQL Connected...");
  }
});

module.exports = db;