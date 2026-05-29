// routes/questionsRoutes.js

const express = require("express");
const router = express.Router();

const questionsModel = require("../models/questionsModel");

// Get questions by limit
router.get("/random/:limit", async (req, res) => {
  try {
    const { limit } = req.params;

    const questions = await questionsModel.getQuestionsByOrderLimit(limit);

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

// Get all questions
router.get("/", async (req, res) => {
  try {
    const data = await questionsModel.getAllRandomQuestions();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Get single question
router.get("/:id", async (req, res) => {
  try {
    const data = await questionsModel.getQuestionById(req.params.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Add new question
router.post("/add", async (req, res) => {
  try {
    const { type, question } = req.body;

    if (!type || !question) {
      return res.status(400).json({
        success: false,
        message: "Type and question are required",
      });
    }

    await questionsModel.addQuestion(type, question);

    res.json({
      success: true,
      message: "Question added successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Update question
router.put("/update/:id", async (req, res) => {
  try {
    const { type, question } = req.body;

    await questionsModel.updateQuestion(
      req.params.id,
      type,
      question
    );

    res.json({
      success: true,
      message: "Question updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Update only question type
router.put("/type/:id", async (req, res) => {
  try {
    const { type } = req.body;

    await questionsModel.updateQuestionType(
      req.params.id,
      type
    );

    res.json({
      success: true,
      message: "Question type updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Delete question (soft delete)
router.delete("/delete/:id", async (req, res) => {
  try {
    await questionsModel.deleteQuestion(req.params.id);

    res.json({
      success: true,
      message: "Question deleted successfully",
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