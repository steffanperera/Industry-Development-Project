const express = require('express');
const router = express.Router();
const caregiverModel = require('../models/caregiversModel');
const db = require('../db');

// POST /api/caregivers/register — register a new caregiver
router.post('/register', (req, res) => {
  const data = req.body;

  caregiverModel.createCaregiver(data, (err, caregiverId) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error saving caregiver' });
    }

    // Save care types
    caregiverModel.saveCareTypes(caregiverId, data.careTypes, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error saving care types' });
      }

      // Save skills
      caregiverModel.saveSkills(caregiverId, data.skills, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error saving skills' });
        }

        res.json({
          message: 'Caregiver registered successfully',
          caregiverId,
        });
      });
    });
  });
});

// POST /api/caregivers/crquestions — submit quiz answers, grade and save
router.post('/crquestions', (req, res) => {
  try {
    const { caregiverId, answers } = req.body;
    console.log(req.body);

    if (!caregiverId || !answers || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data',
      });
    }

    // Fetch correct answers from DB
    const q_ids = answers.map((a) => a.q_id);

    const query = `
      SELECT q_id, correct_answer
      FROM questions
      WHERE q_id IN (?)
    `;

    db.query(query, [q_ids], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      // Build correct answer lookup map
      const correctMap = {};
      results.forEach((q) => {
        correctMap[q.q_id] = q.correct_answer;
      });

      // Attach correct answer and is_correct flag to each submitted answer
      const finalAnswers = answers.map((a) => {
        const correct = correctMap[a.q_id];
        return {
          caregiverId,
          q_id: a.q_id,
          answer: a.answer,
          correct_answer: correct,
          is_correct: parseInt(a.answer) === parseInt(correct) ? 1 : 0,
        };
      });

      // Save to DB
      await caregiverModel.saveCaregiverAnswers(finalAnswers);

      // Calculate score
      const score = finalAnswers.filter((a) => a.is_correct === 1).length;
      const total = finalAnswers.length;

      res.json({
        success: true,
        message: 'Quiz submitted',
        score,
        total,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// GET /api/caregivers/getone/:caregiverId — fetch single caregiver profile
router.get('/getone/:caregiverId', (req, res) => {
  caregiverModel.getOne(req.params.caregiverId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
