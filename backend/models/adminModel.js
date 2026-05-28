const db = require('../db');
const bcrypt = require('bcrypt');

const User = {
  getAll: (callback) => {
    db.query('SELECT * FROM user', callback);
  },

  check: async (User, callback) => {
    const { username, password } = User;
    db.query(
      'SELECT * FROM user WHERE userName = ? AND userRole="ADMIN"',
      [username],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      }
    );
  },

  // NEW: Get all assessments with caregiver names and computed score
  getAssessmentslistAll: (callback) => {
    const sql = `
      SELECT
        assessments.assessmentId,
        assessments.caregiverId,
        assessments.grade,
        assessments.attempt,
        caregivers.first_name,
        caregivers.last_name,
        SUM(caregiver_questions.answer)/300*100 AS score
      FROM assessments
      LEFT JOIN caregivers
        ON assessments.caregiverId = caregivers.id
      LEFT JOIN caregiver_questions
        ON assessments.attempt = caregiver_questions.attempt
        AND assessments.caregiverId = caregiver_questions.caregiverId
      GROUP BY assessments.attempt, assessments.caregiverId
    `;
    db.query(sql, callback);
  },
};

module.exports = User;
