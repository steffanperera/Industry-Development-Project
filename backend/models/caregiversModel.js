const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(plainPassword) {
  const hash = await bcrypt.hash(plainPassword, 10);
  return hash;
}

// Get all caregivers
const getAll = (callback) => {
  const sql = `SELECT * FROM caregivers`;
  db.query(sql, callback);
};

// Get one caregiver by ID
const getOne = (caregiverId, callback) => {
  console.log(caregiverId);
  const sql = `SELECT * FROM caregivers WHERE id = ?`;
  const id = caregiverId;
  db.query(sql, id, callback);
};

// Get one caregiver by email
const getonebyemail = (userName, callback) => {
  const sql = `SELECT * FROM caregivers WHERE email = ?`;
  const id = userName;
  db.query(sql, id, callback);
};

// Save caregiver main data — slimmed to new schema (first/last name)
const createCaregiver = async (data, callback) => {
  try {
    const hashedPassword = await hashPassword(data.password);

    const sql = `
      INSERT INTO caregivers 
      (first_name, last_name, dob, 
       mobile, email, address, city, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.firstName,
      data.lastName,
      data.dob,
      data.mobile,
      data.email,
      data.address,
      data.city,
      hashedPassword,
    ];

    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId, hashedPassword);
    });

  } catch (error) {
    callback(error, null);
  }
};

// Save care types (many-to-many)
const saveCareTypes = (caregiverId, careTypes, callback) => {
  if (!careTypes || careTypes.length === 0) return callback(null);
  const sql = `INSERT INTO caregiver_care_types (caregiver_id, care_type) VALUES ?`;
  const values = careTypes.map(typeId => [caregiverId, typeId]);
  db.query(sql, [values], callback);
};

// Save skills (many-to-many)
const saveSkills = (caregiverId, skills, callback) => {
  if (!skills || skills.length === 0) return callback(null);
  const sql = `INSERT INTO caregiver_skills (caregiver_id, skill) VALUES ?`;
  const values = skills.map(skillId => [caregiverId, skillId]);
  db.query(sql, [values], callback);
};

// Save caregiver quiz answers
const saveCaregiverAnswers = (answers) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO caregiver_questions 
      (caregiverId, q_id, answer)
      VALUES ?
    `;

    const values = answers.map((a) => [
      a.caregiverId,
      a.q_id,
      a.answer,
    ]);

    db.query(query, [values], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Get quiz score for a caregiver
const getquestionsscore = (caregiverId, callback) => {
  const sql = `
    SELECT 
      SUM(
        CASE 
          WHEN caregiver_questions.is_correct = 1 THEN 2.5
          ELSE 0
        END
      ) AS quiz_score
    FROM caregiver_questions
    JOIN caregivers
      ON caregivers.id = caregiver_questions.caregiverId
    WHERE caregiver_questions.caregiverId = ?
    GROUP BY caregiver_questions.caregiverId
  `;
  db.query(sql, [caregiverId], callback);
};

module.exports = {
  createCaregiver,
  saveCareTypes,
  saveSkills,
  saveCaregiverAnswers,
  getOne,
  getAll,
  getquestionsscore,
  getonebyemail,
};
