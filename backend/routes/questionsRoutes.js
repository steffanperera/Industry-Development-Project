// routes/questionsRoutes.js
const express = require("express");
const router = express.Router();
const questionsModel = require("../models/questionsModel");

// GET 5 random questions by type
router.get("/random/:type", async (req, res) => {
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
      message: "Server error",
    });
  }
});

// GET 5 questions from each type
router.get("/random", async (req, res) => {
  try {
    const data = await questionsModel.getAllRandomQuestions();
    //console.log(data);
    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;