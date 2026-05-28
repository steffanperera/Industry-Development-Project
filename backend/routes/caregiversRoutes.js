const express = require('express');
const router = express.Router();
const caregiverModel = require('../models/caregiversModel');
const userModel = require('../models/userModel');
const db = require('../db');

// GET /api/caregivers
router.get('/', (req, res) => {
  caregiverModel.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST /api/caregivers/register
router.post('/register', (req, res) => {
  const data = req.body;

  caregiverModel.createCaregiver(data, (err, caregiverId, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error saving caregiver' });
    }

    userModel.SaveUser(data, hashedPassword, 'CAREGIVER', (err, userId) => {
      if (err) console.error(err);
    });

    res.json({ message: 'Caregiver registered successfully', caregiverId });
  });
});

// POST /api/caregivers/crquestions — save raw answers, attempt tracked in model
router.post('/crquestions', (req, res) => {
  try {
    const { caregiverId, answers } = req.body;
    console.log(req.body);

    if (!caregiverId || !answers || answers.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }

    const q_ids = answers.map((a) => a.q_id);
    const query = `SELECT q_id FROM questions WHERE q_id IN (?)`;

    db.query(query, [q_ids], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      const finalAnswers = answers.map((a) => ({
        caregiverId,
        q_id: a.q_id,
        answer: a.answer,
      }));

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

// GET /api/caregivers/getscore/:caregiverId/:attempt
router.get('/getscore/:caregiverId/:attempt', (req, res) => {
  caregiverModel.getquestionsscore(
    req.params.caregiverId,
    req.params.attempt,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }

      if (results.length === 0) {
        return res.json({ success: false, message: 'No data found' });
      }

      const data = results[0];
      const quizScore = Number(data.quiz_score || 0);
      console.log(quizScore);

      const totalScore = quizScore;

      res.json({
        success: true,
        caregiverId: req.params.caregiverId,
        quizScore,
        totalScore,
      });
    }
  );
});

// GET /api/caregivers/getgrade/:score
router.get('/getgrade/:score', (req, res) => {
  try {
    const score = Number(req.params.score);
    let grade = '';

    if      (score >= 40) grade = 'Strength area – High demonstrated capability';
    else if (score >= 30) grade = 'Growth area – Developing competency';
    else if (score >= 10) grade = 'Support area – Targeted learning recommended';
    else                  grade = 'Try Again';

    res.json({ success: true, score, grade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
