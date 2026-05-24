const express = require('express');
const router = express.Router();
const questionsModel = require('../models/questionsModel');

// GET /api/questions/random/:type — 5 random questions for a specific type
router.get('/random/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const questions = await questionsModel.getRandomQuestionsByType(type);

    res.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// GET /api/questions/random — 5 questions from each type combined
router.get('/random', async (req, res) => {
  try {
    const data = await questionsModel.getAllRandomQuestions();

    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;
