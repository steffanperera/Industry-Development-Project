const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(plainPassword) {
  const hash = await bcrypt.hash(plainPassword, 10);
  return hash;
}

// Get all caregivers — now includes latest attempt via LEFT JOIN
const getAll = (callback) => {
  const sql = `
    SELECT
      caregivers.*,
      COALESCE(MAX(assessments.attempt), 0) AS attempt
    FROM caregivers
    LEFT JOIN assessments ON caregivers.id = assessments.caregiverId
    GROUP BY caregivers.id
  `;
  db.query(sql, callback);
};

const getOne = (caregiverId, callback) => {
  console.log(caregiverId);
  const sql = `SELECT * FROM caregivers WHERE id = ?`;
  db.query(sql, caregiverId, callback);
};

const getonebyemail = (userName, callback) => {
  const sql = `SELECT * FROM caregivers WHERE email = ?`;
  db.query(sql, userName, callback);
};

// Save caregiver main data
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
      data.firstName, data.lastName, data.dob,
      data.mobile, data.email, data.address, data.city,
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

const saveCareTypes = (caregiverId, careTypes, callback) => {
  if (!careTypes || careTypes.length === 0) return callback(null);
  const sql = `INSERT INTO caregiver_care_types (caregiver_id, care_type) VALUES ?`;
  const values = careTypes.map(typeId => [caregiverId, typeId]);
  db.query(sql, [values], callback);
};

const saveSkills = (caregiverId, skills, callback) => {
  if (!skills || skills.length === 0) return callback(null);
  const sql = `INSERT INTO caregiver_skills (caregiver_id, skill) VALUES ?`;
  const values = skills.map(skillId => [caregiverId, skillId]);
  db.query(sql, [values], callback);
};

// Save answers with attempt tracking + auto-create assessment
const saveCaregiverAnswers = (answers) => {
  return new Promise((resolve, reject) => {
    if (!answers || answers.length === 0) return reject('No answers provided');

    const caregiverId = answers[0].caregiverId;

    const countQuery = `SELECT COUNT(*) AS total FROM caregiver_questions WHERE caregiverId = ?`;
    db.query(countQuery, [caregiverId], (err, countResult) => {
      if (err) return reject(err);

      const totalAnswers = countResult[0].total;
      const attempt = Math.floor(totalAnswers / 60) + 1;

      const insertQuery = `
        INSERT INTO caregiver_questions (caregiverId, q_id, answer, attempt)
        VALUES ?
      `;
      const values = answers.map((a) => [a.caregiverId, a.q_id, a.answer, attempt]);

      db.query(insertQuery, [values], (err) => {
        if (err) return reject(err);

        const totalAttemptQuery = `
          SELECT COUNT(*) AS total FROM caregiver_questions
          WHERE caregiverId = ? AND attempt = ?
        `;
        db.query(totalAttemptQuery, [caregiverId, attempt], (err, totalResult) => {
          if (err) return reject(err);

          const totalForAttempt = totalResult[0].total;

          if (totalForAttempt >= 60) {
            const scoreQuery = `
              SELECT SUM(answer) AS score FROM caregiver_questions
              WHERE caregiverId = ? AND attempt = ?
            `;
            db.query(scoreQuery, [caregiverId, attempt], (err, scoreResult) => {
              if (err) return reject(err);
              const totalScore = scoreResult[0].score || 0;

              db.query(
                `INSERT INTO assessments (caregiverId, score, attempt) VALUES (?, ?, ?)`,
                [caregiverId, totalScore, attempt],
                (err) => {
                  if (err) return reject(err);
                  resolve({ success: true, message: 'Assessment completed', attempt, score: totalScore });
                }
              );
            });
          } else {
            resolve({ success: true, message: 'Answers saved successfully', attempt });
          }
        });
      });
    });
  });
};

const getquestionsscore = (caregiverId, attempt, callback) => {
  const sql = `
    SELECT SUM(caregiver_questions.answer)/300*100 AS quiz_score
    FROM caregiver_questions
    JOIN caregivers ON caregivers.id = caregiver_questions.caregiverId
    WHERE caregiver_questions.caregiverId = ?
    AND caregiver_questions.attempt = ?
    GROUP BY caregiver_questions.caregiverId
  `;
  db.query(sql, [caregiverId, attempt], callback);
};

// NEW: Get per-type scoreboard for a caregiver attempt
const getscoreboard = (caregiverId, attempt, callback) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        questions.type,
        caregiver_questions.attempt,
        SUM(caregiver_questions.answer)/5 AS quiz_score
      FROM questions
      INNER JOIN caregiver_questions ON questions.q_id = caregiver_questions.q_id
      WHERE caregiver_questions.caregiverId = ?
      AND attempt = ?
      GROUP BY type
    `;
    db.query(query, [caregiverId, attempt], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// NEW: Soft delete caregiver
const deleteCaregiver = (empId, callback) => {
  const sql = `UPDATE caregivers SET status = 'DEL' WHERE id = ?`;
  db.query(sql, [empId], callback);
};

// NEW: Search caregivers by keyword
const searchCaregivers = (keyword, callback) => {
  const sql = `
    SELECT * FROM caregivers
    WHERE
      first_name LIKE ? OR last_name LIKE ? OR
      email LIKE ? OR mobile LIKE ? OR city LIKE ?
  `;
  const s = `%${keyword}%`;
  db.query(sql, [s, s, s, s, s], callback);
};

// NEW: Filter caregivers by city and/or status
const filterCaregivers = (city, status, callback) => {
  let sql = `SELECT * FROM caregivers WHERE 1=1`;
  let values = [];
  if (city)   { sql += ` AND city = ?`;   values.push(city); }
  if (status) { sql += ` AND status = ?`; values.push(status); }
  sql += ` ORDER BY id DESC`;
  db.query(sql, values, callback);
};

// NEW: Update caregiver fields
const updateCaregiver = async (empId, data, callback) => {
  try {
    let sql = `
      UPDATE caregivers SET
        first_name = ?, last_name = ?, dob = ?,
        mobile = ?, email = ?, address = ?, city = ?, status = ?
    `;
    let values = [
      data.firstName, data.lastName, data.dob,
      data.mobile, data.email, data.address, data.city, data.status,
    ];
    if (data.password && data.password.trim() !== '') {
      const hashedPassword = await hashPassword(data.password);
      sql += `, password = ?`;
      values.push(hashedPassword);
    }
    sql += ` WHERE id = ?`;
    values.push(empId);
    db.query(sql, values, callback);
  } catch (error) {
    callback(error);
  }
};

// NEW: Get assessments list for a caregiver
const getAssessmentslist = (caregiverId, callback) => {
  console.log(caregiverId);
  const sql = `SELECT * FROM assessments WHERE caregiverId = ?`;
  db.query(sql, caregiverId, callback);
};


// =========================
// Insert Caregiver Onboarding
// =========================
const insertCaregiverOnboarding = (data) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO caregiver_onboarding (
        caregiverId,
        current_work_status,
        looking_for_work,
        applied_jobs_4weeks,
        industry_interest,
        speak_other_language,
        other_language,
        heard_about_app,
        reason_for_joining,
        care_for,
        cared_person_age_range,
        care_categories,
        caregiving_duration
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.caregiverId,
      data.current_work_status,
      data.looking_for_work,
      data.applied_jobs_4weeks,
      data.industry_interest,
      data.speak_other_language,
      data.other_language,
      data.heard_about_app,
      data.reason_for_joining,
      data.care_for,
      data.cared_person_age_range,
      data.care_categories,
      data.caregiving_duration,
    ];
    db.query(query, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// =========================
// Get Onboarding By Caregiver ID
// =========================
const getCaregiverOnboardingById = (caregiverId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM caregiver_onboarding WHERE caregiverId = ?`;
    db.query(query, [caregiverId], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

// =========================
// Update Onboarding
// =========================
const updateCaregiverOnboarding = (caregiverId, data) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE caregiver_onboarding SET
        current_work_status = ?,
        looking_for_work = ?,
        applied_jobs_4weeks = ?,
        industry_interest = ?,
        speak_other_language = ?,
        other_language = ?,
        heard_about_app = ?,
        reason_for_joining = ?,
        care_for = ?,
        cared_person_age_range = ?,
        care_categories = ?,
        caregiving_duration = ?
      WHERE caregiverId = ?
    `;
    const values = [
      data.current_work_status,
      data.looking_for_work,
      data.applied_jobs_4weeks,
      data.industry_interest,
      data.speak_other_language,
      data.other_language,
      data.heard_about_app,
      data.reason_for_joining,
      data.care_for,
      data.cared_person_age_range,
      data.care_categories,
      data.caregiving_duration,
      caregiverId,
    ];
    db.query(query, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
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
  getscoreboard,
  updateCaregiver,
  deleteCaregiver,
  searchCaregivers,
  filterCaregivers,
  getAssessmentslist,
  insertCaregiverOnboarding,
  getCaregiverOnboardingById,
  updateCaregiverOnboarding,
};
