// models/questionsModel.js

const db = require("../config/db");

// Get questions by limit
const getQuestionsByOrderLimit = (limit) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT q_id, type, question
      FROM questions
      WHERE status='Active'
      AND q_id <= ?
      ORDER BY q_id DESC
      LIMIT 5
    `;

    db.query(query, [parseInt(limit)], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Get all active questions
const getAllRandomQuestions = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT q_id, type, question, status
      FROM questions
      WHERE status='Active'
      ORDER BY q_id DESC
    `;

    db.query(query, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Get single question
const getQuestionById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM questions
      WHERE q_id = ?
    `;

    db.query(query, [id], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

// Add new question
const addQuestion = (type, question) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO questions (type, question, status)
      VALUES (?, ?, 'Active')
    `;

    db.query(query, [type, question], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Update question
const updateQuestion = (id, type, question) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE questions
      SET type = ?, question = ?
      WHERE q_id = ?
    `;

    db.query(query, [type, question, id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Delete question (Soft Delete)
const deleteQuestion = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE questions
      SET status = 'Deleted'
      WHERE q_id = ?
    `;

    db.query(query, [id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Update only type
const updateQuestionType = (id, type) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE questions
      SET type = ?
      WHERE q_id = ?
    `;

    db.query(query, [type, id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  getQuestionsByOrderLimit,
  getAllRandomQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  updateQuestionType,
};