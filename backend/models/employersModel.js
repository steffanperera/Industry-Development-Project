const db = require('../db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Hash Password
async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, saltRounds);
}

/* =========================
   GET ALL EMPLOYERS
========================= */
const getAll = (callback) => {
  const sql = `SELECT * FROM employer`;
  db.query(sql, callback);
};

/* =========================
   GET SINGLE EMPLOYER
========================= */
const getOne = (empId, callback) => {
  const sql = `SELECT * FROM employer WHERE empId = ?`;
  db.query(sql, [empId], callback);
};

/* =========================
   SEARCH EMPLOYERS
========================= */
const searchEmployers = (keyword, callback) => {
  const sql = `
    SELECT * FROM employer
    WHERE
      first_name LIKE ? OR last_name LIKE ? OR
      email LIKE ? OR mobile LIKE ? OR
      companyName LIKE ? OR city LIKE ?
  `;
  const s = `%${keyword}%`;
  db.query(sql, [s, s, s, s, s, s], callback);
};

/* =========================
   FILTER EMPLOYERS
========================= */
const filterEmployers = (city, status, callback) => {
  let sql = `SELECT * FROM employer WHERE 1=1`;
  let values = [];

  if (city)   { sql += ` AND city = ?`;   values.push(city); }
  if (status) { sql += ` AND status = ?`; values.push(status); }

  sql += ` ORDER BY empId DESC`;
  db.query(sql, values, callback);
};

/* =========================
   CREATE EMPLOYER
========================= */
const createEmployer = async (data, callback) => {
  try {
    const hashedPassword = await hashPassword(data.password);

    const sql = `
      INSERT INTO employer
      (first_name, last_name, dob, mobile, email,
       companyName, address, city, password, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.firstName,
      data.lastName,
      data.dob,
      data.mobile,
      data.email,
      data.companyName,
      data.address,
      data.city,
      hashedPassword,
      'ACT',
    ];

    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId, hashedPassword);
    });
  } catch (error) {
    callback(error, null);
  }
};

/* =========================
   UPDATE EMPLOYER
========================= */
const updateEmployer = async (empId, data, callback) => {
  try {
    let sql = `
      UPDATE employer SET
        first_name = ?, last_name = ?, dob = ?,
        mobile = ?, email = ?, companyName = ?,
        address = ?, city = ?, status = ?
    `;
    let values = [
      data.firstName, data.lastName, data.dob,
      data.mobile, data.email, data.companyName,
      data.address, data.city, data.status,
    ];

    if (data.password && data.password.trim() !== '') {
      const hashedPassword = await hashPassword(data.password);
      sql += `, password = ?`;
      values.push(hashedPassword);
    }

    sql += ` WHERE empId = ?`;
    values.push(empId);

    db.query(sql, values, callback);
  } catch (error) {
    callback(error);
  }
};

/* =========================
   DELETE EMPLOYER (SOFT)
========================= */
const deleteEmployer = (empId, callback) => {
  const sql = `UPDATE employer SET status = 'DEL' WHERE empId = ?`;
  db.query(sql, [empId], callback);
};

/* =========================
   GET BY EMAIL
========================= */
const getonebyemail = (userName, callback) => {
  const sql = `SELECT * FROM employer WHERE email = ?`;
  db.query(sql, userName, callback);
};

module.exports = {
  getAll,
  getOne,
  createEmployer,
  updateEmployer,
  deleteEmployer,
  searchEmployers,
  filterEmployers,
  getonebyemail,
};
