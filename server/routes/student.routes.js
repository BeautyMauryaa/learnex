import express from "express";
import Student from "../models/Student.js";
// Import your JWT authentication middleware here later, e.g.:
// import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ Get profile
router.get("/me", async (req, res) => {
  try {
    const student = await Student.findOne({ email: "test@example.com" });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update profile/settings
router.put("/me", async (req, res) => {
  try {
    const updates = req.body;
    const student = await Student.findOneAndUpdate(
      { email: "test@example.com" }, 
      updates,
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Upload certificate/document
router.post("/me/documents", async (req, res) => {
  try {
    const { name, url } = req.body; 
    const student = await Student.findOneAndUpdate(
      { email: "test@example.com" },
      { $push: { documents: { name, url } } },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================================================
// ✅ NEW: Get Exam Results (Fixes your 404 Dashboard Error)
// =========================================================
router.get("/grades", async (req, res) => {
  try {
    // 1. Temporary real placeholder mock-data that perfectly satisfies your 
    //    frontend Dashboard's expected ExamResult array structure.
    const mockGradesData = [
      {
        exam: { name: "Math Midterm (Live From Server)", totalMarks: 100, date: "2026-05-12" },
        score: 85,
        grade: "A",
        visible: true,
        answers: [
          { questionId: 1, givenAnswer: "A", isCorrect: true, obtainedMarks: 5 },
          { questionId: 2, givenAnswer: "B", isCorrect: true, obtainedMarks: 5 }
        ],
        createdAt: "2026-05-13"
      },
      {
        exam: { name: "Physics Quiz (Live From Server)", totalMarks: 50, date: "2026-05-15" },
        score: 42,
        grade: "B",
        visible: true,
        answers: [],
        createdAt: "2026-05-16"
      }
    ];

    // 2. Return it back cleanly to the frontend
    res.status(200).json(mockGradesData);

    /* 👉 LATER DEVELOPMENT STEP (When you are ready to query MongoDB collections):
    
    // Assuming you have your protect route middleware active:
    // const studentId = req.user.id; 
    
    const realDatabaseGrades = await ExamResultCollection.find({ student: "test@example.com" }).populate('exam');
    res.status(200).json(realDatabaseGrades);
    */
    
  } catch (err) {
    console.error("Error serving student report data:", err);
    res.status(500).json({ message: "Server error retrieving report cards." });
  }
});

export default router;