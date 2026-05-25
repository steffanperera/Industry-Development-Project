// models/questionsModel.js
const db = require("../config/db"); // your mysql connection

// Get 5 random questions for a given type
const getRandomQuestionsByType = (type) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT q_id, type, question, answer1, answer2, answer3, answer4
      FROM questions
      WHERE type = ?
      ORDER BY RAND()
      LIMIT 5
    `;

    db.query(query, [type], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Get both types (SB_mcq + CK_mcq)
const getAllRandomQuestions = async () => {
  try {
    const sbQuestions = await getRandomQuestionsByType("SB_mcq");
    const ckQuestions = await getRandomQuestionsByType("CK_mcq");
    //console.log(sbQuestions);
    return {
      SB_mcq: sbQuestions,
      CK_mcq: ckQuestions,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRandomQuestionsByType,
  getAllRandomQuestions,
};