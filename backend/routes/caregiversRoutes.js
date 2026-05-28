const express = require('express');
const router = express.Router();
const caregiverModel = require('../models/caregiversModel');
const userModel = require('../models/userModel');
const db = require('../db');

// GET all caregivers
router.get('/', (req, res) => {
  caregiverModel.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST register
router.post('/register', (req, res) => {
  const data = req.body;
  caregiverModel.createCaregiver(data, (err, caregiverId, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error saving caregiver' });
    }
    userModel.SaveUser(data, hashedPassword, 'CAREGIVER', (err) => {
      if (err) console.error(err);
    });
    res.json({ message: 'Caregiver registered successfully', caregiverId });
  });
});

// POST submit quiz answers
router.post('/crquestions', (req, res) => {
  try {
    const { caregiverId, answers } = req.body;
    console.log(req.body);
    if (!caregiverId || !answers || answers.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }
    const q_ids = answers.map((a) => a.q_id);
    db.query(`SELECT q_id FROM questions WHERE q_id IN (?)`, [q_ids], async (err) => {
      if (err) { console.error(err); return res.status(500).json({ success: false }); }
      const finalAnswers = answers.map((a) => ({ caregiverId, q_id: a.q_id, answer: a.answer }));
      await caregiverModel.saveCaregiverAnswers(finalAnswers);
      res.json({ success: true, message: 'Quiz submitted' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET single caregiver
router.get('/getone/:caregiverId', (req, res) => {
  caregiverModel.getOne(req.params.caregiverId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET caregiver by email
router.get('/getonebyemail/:userName', (req, res) => {
  caregiverModel.getonebyemail(req.params.userName, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET score by attempt
router.get('/getscore/:caregiverId/:attempt', (req, res) => {
  caregiverModel.getquestionsscore(req.params.caregiverId, req.params.attempt, (err, results) => {
    if (err) { console.error(err); return res.status(500).json({ success: false, message: 'Server error' }); }
    if (results.length === 0) return res.json({ success: false, message: 'No data found' });
    const quizScore = Number(results[0].quiz_score || 0);
    res.json({ success: true, caregiverId: req.params.caregiverId, quizScore, totalScore: quizScore });
  });
});

// GET grade from score
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
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET scoreboard by type for a caregiver attempt
router.get('/scoreboard/:caregiverId/:attempt', async (req, res) => {
  try {
    const { caregiverId, attempt } = req.params;
    const scoreboards = await caregiverModel.getscoreboard(caregiverId, attempt);
    console.log(scoreboards);
    res.json({ success: true, data: scoreboards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET search by keyword
router.get('/search/:keyword', (req, res) => {
  caregiverModel.searchCaregivers(req.params.keyword, (err, results) => {
    if (err) return res.status(500).json(err);
    console.log(results);
    res.json(results);
  });
});

// GET filter by city/status
router.get('/filter/data', (req, res) => {
  const { city, status } = req.query;
  caregiverModel.filterCaregivers(city, status, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// PUT update caregiver
router.put('/:id', (req, res) => {
  caregiverModel.updateCaregiver(req.params.id, req.body, (err) => {
    if (err) { console.error(err); return res.status(500).json({ message: 'Error updating Caregiver' }); }
    res.json({ message: 'Caregiver updated successfully' });
  });
});

// DELETE caregiver (soft)
router.delete('/:id', (req, res) => {
  caregiverModel.deleteCaregiver(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: 'Error deleting Caregiver' });
    res.json({ message: 'Caregiver deleted successfully' });
  });
});

// GET assessment/certificate list for a caregiver
router.get('/certificatelist/:caregiverId', (req, res) => {
  console.log(req.params.caregiverId);
  caregiverModel.getAssessmentslist(req.params.caregiverId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
