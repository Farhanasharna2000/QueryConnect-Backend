const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Add new question
router.post("/", async (req, res) => {
  try {
    console.log("Body received:", req.body); // debug
    const newQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    console.error("Error saving question:", err.message);
    res.status(500).json({ message: err.message });
  }
});
// Get all questions by logged-in user
router.get("/my-questions", async (req, res) => {
  const userEmail = req.query.email;

  if (!userEmail) {
    return res.status(400).json({ message: "User email is required" });
  }

  const userQuestions = await Question.find({ "askedBy.email": userEmail });
  res.send(userQuestions);
});

// Update a question
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const updated = await Question.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete logged-in user question
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedQuestion = await Question.findByIdAndDelete(id);
    res.send(deletedQuestion);
  } catch (error) {
    res.send(error.message);
  }
});

// GET all public questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 }); // Latest first
    res.json(questions);
  } catch (error) {
    console.error("Error fetching all questions:", error.message);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

// Get single question by ID
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
