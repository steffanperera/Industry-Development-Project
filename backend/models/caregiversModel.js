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
  db.query(sql, caregiverId, callback);
};

// Get one caregiver by email
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

// Save caregiver quiz answers with attempt tracking + auto-create assessment
const saveCaregiverAnswers = (answers) => {
  return new Promise((resolve, reject) => {

    if (!answers || answers.length === 0) {
      return reject('No answers provided');
    }

    const caregiverId = answers[0].caregiverId;

    /* =========================================
       STEP 1: GET CURRENT ANSWER COUNT
       to calculate which attempt number this is
    ========================================= */
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM caregiver_questions
      WHERE caregiverId = ?
    `;

    db.query(countQuery, [caregiverId], (err, countResult) => {
      if (err) return reject(err);

      const totalAnswers = countResult[0].total;

      /* =========================================
         CALCULATE ATTEMPT NUMBER
         0  - 59  => Attempt 1
         60 - 119 => Attempt 2
         120- 179 => Attempt 3
      ========================================= */
      const attempt = Math.floor(totalAnswers / 60) + 1;

      /* =========================================
         STEP 2: INSERT ANSWERS WITH ATTEMPT
      ========================================= */
      const insertQuery = `
        INSERT INTO caregiver_questions
        (caregiverId, q_id, answer, attempt)
        VALUES ?
      `;

      const values = answers.map((a) => [
        a.caregiverId,
        a.q_id,
        a.answer,
        attempt,
      ]);

      db.query(insertQuery, [values], (err, result) => {
        if (err) return reject(err);

        /* =========================================
           STEP 3: CHECK TOTAL FOR THIS ATTEMPT
        ========================================= */
        const totalAttemptQuery = `
          SELECT COUNT(*) AS total
          FROM caregiver_questions
          WHERE caregiverId = ?
          AND attempt = ?
        `;

        db.query(totalAttemptQuery, [caregiverId, attempt], (err, totalResult) => {
          if (err) return reject(err);

          const totalForAttempt = totalResult[0].total;

          /* =========================================
             IF 60 QUESTIONS ANSWERED — CREATE ASSESSMENT
          ========================================= */
          if (totalForAttempt >= 60) {

            const scoreQuery = `
              SELECT SUM(answer) AS score
              FROM caregiver_questions
              WHERE caregiverId = ?
              AND attempt = ?
            `;

            db.query(scoreQuery, [caregiverId, attempt], (err, scoreResult) => {
              if (err) return reject(err);

              const totalScore = scoreResult[0].score || 0;

              const assessmentQuery = `
                INSERT INTO assessments
                (caregiverId, score, attempt)
                VALUES (?, ?, ?)
              `;

              db.query(assessmentQuery, [caregiverId, totalScore, attempt], (err, assessmentResult) => {
                if (err) return reject(err);

                resolve({
                  success: true,
                  message: 'Assessment completed',
                  attempt,
                  score: totalScore,
                });
              });
            });

          } else {
            resolve({
              success: true,
              message: 'Answers saved successfully',
              attempt,
            });
          }
        });
      });
    });
  });
};

// Get quiz score for a caregiver by attempt
const getquestionsscore = (caregiverId, attempt, callback) => {
  const sql = `
    SELECT 
      SUM(caregiver_questions.answer) / 300 * 100 AS quiz_score
    FROM caregiver_questions
    JOIN caregivers
      ON caregivers.id = caregiver_questions.caregiverId
    WHERE caregiver_questions.caregiverId = ?
    AND caregiver_questions.attempt = ?
    GROUP BY caregiver_questions.caregiverId
  `;
  db.query(sql, [caregiverId, attempt], callback);
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
