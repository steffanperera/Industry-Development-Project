const express = require('express');
const router = express.Router();
const caregiverModel = require('../models/caregiversModel');
const db = require('../db');

// POST /api/caregivers/register
router.post('/register', (req, res) => {
  const data = req.body;

  caregiverModel.createCaregiver(data, (err, caregiverId) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error saving caregiver' });
    }

    caregiverModel.saveCareTypes(caregiverId, data.careTypes, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error saving care types' });
      }

      caregiverModel.saveSkills(caregiverId, data.skills, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error saving skills' });
        }

        res.json({ message: 'Caregiver registered successfully', caregiverId });
      });
    });
  });
});

// POST /api/caregivers/crquestions
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

    // Quiz score
    const quizScore = Number(data.quiz_score || 0);

    // Experience marks
    let experienceMarks = 0;
    switch (data.experience_years) {
      case '3 years or more':      experienceMarks = 45; break;
      case '2\u20133 years':       experienceMarks = 35; break;
      case '1\u20132 years':       experienceMarks = 25; break;
      case '6 months\u20131 year': experienceMarks = 15; break;
      case 'Less than 6 months':   experienceMarks = 5;  break;
      case 'No experience':        experienceMarks = 0;  break;
      default:                     experienceMarks = 0;
    }

    // Qualification marks
    let qualificationMarks = 0;
    switch (data.has_certifications) {
      case 'Masters degree or higher (relevant field)': qualificationMarks = 30; break;
      case 'Bachelors degree (relevant field)':         qualificationMarks = 25; break;
      case 'Bachelors degree (non-relevant field)':     qualificationMarks = 18; break;
      case 'Diploma / HND (relevant field)':            qualificationMarks = 18; break;
      case 'Diploma / HND (non-relevant field)':        qualificationMarks = 12; break;
      case 'Certificate III or IV (relevant field)':    qualificationMarks = 12; break;
      case 'Certificate I or II':                       qualificationMarks = 7;  break;
      case 'No formal qualification':                   qualificationMarks = 0;  break;
      default:                                          qualificationMarks = 0;
    }

    // Bonus marks
    let bonusMarks = 0;
    const certList = (data.certification_list || '').toLowerCase();
    if (certList.includes('diploma') || certList.includes('degree')) {
      bonusMarks = 5;
    }

    const totalScore = quizScore + experienceMarks + qualificationMarks + bonusMarks;

    res.json({
      success: true,
      caregiverId: req.params.caregiverId,
      quizScore,
      experienceMarks,
      qualificationMarks,
      bonusMarks,
      totalScore,
      experience: data.experience_years,
      qualification: data.has_certifications,
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
