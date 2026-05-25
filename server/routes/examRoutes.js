import express from "express";
import Exam from "../models/Exam.js";

const router = express.Router();

// ✅ Create Exam
router.post("/exams", async (req, res) => {
  try {
    const exam = new Exam(req.body);

    await exam.save();

    res.status(201).json({
      message: "Exam created successfully",
      exam,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create exam",
      error: err.message,
    });
  }
});

// ✅ Get all exams
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find()
      .select("title description deadline totalMarks duration")
      .populate("teacher", "name email");

    res.json(exams);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

export default router;