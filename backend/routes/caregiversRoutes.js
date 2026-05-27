const express = require('express');
const router = express.Router();
const caregiverModel = require('../models/caregiversModel');
const userModel = require('../models/userModel');
const db = require('../db');

// GET /api/caregivers — get all caregivers
router.get('/', (req, res) => {
  caregiverModel.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST /api/caregivers/register — register caregiver + create user account
router.post('/register', (req, res) => {
  const data = req.body;

  caregiverModel.createCaregiver(data, (err, caregiverId, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error saving caregiver' });
    }

    // Save to user table for centralised auth
    userModel.SaveUser(data, hashedPassword, 'CAREGIVER', (err, userId) => {
      if (err) {
        console.error(err);
      }
    });

    res.json({
      message: 'Caregiver registered successfully',
      caregiverId,
    });
  });
});

// POST /api/caregivers/crquestions — submit quiz answers
router.post('/crquestions', (req, res) => {
  try {
    const { caregiverId, answers } = req.body;
    console.log(req.body);

    if (!caregiverId || !answers || answers.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }

    const q_ids = answers.map((a) => a.q_id);
    const query = `SELECT q_id, correct_answer FROM questions WHERE q_id IN (?)`;

    db.query(query, [q_ids], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      const correctMap = {};
      results.forEach((q) => { correctMap[q.q_id] = q.correct_answer; });

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

      await caregiverModel.saveCaregiverAnswers(finalAnswers);

      const score = finalAnswers.filter((a) => a.is_correct === 1).length;
      const total = finalAnswers.length;

      res.json({ success: true, message: 'Quiz submitted', score, total });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/caregivers/getone/:caregiverId
router.get('/getone/:caregiverId', (req, res) => {
  caregiverModel.getOne(req.params.caregiverId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/caregivers/getonebyemail/:userName
router.get('/getonebyemail/:userName', (req, res) => {
  caregiverModel.getonebyemail(req.params.userName, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/caregivers/getscore/:caregiverId
router.get('/getscore/:caregiverId', (req, res) => {
  caregiverModel.getquestionsscore(req.params.caregiverId, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (results.length === 0) {
      return res.json({ success: false, message: 'No data found' });
    }

    const data = results[0];
    const quizScore = Number(data.quiz_score || 0);
    const totalScore = quizScore;

    res.json({
      success: true,
      caregiverId: req.params.caregiverId,
      quizScore,
      totalScore,
    });
  });
});

// GET /api/caregivers/getgrade/:score
router.get('/getgrade/:score', (req, res) => {
  try {
    const score = Number(req.params.score);
    let grade = '';

    if      (score >= 80) grade = 'A';
    else if (score >= 60) grade = 'B';
    else if (score >= 40) grade = 'C';
    else                  grade = 'F';

    res.json({ success: true, score, grade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
