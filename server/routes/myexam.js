// import express from "express";
// import Exam from "../models/Exam.js";
// import Result from "../models/Result.js";
// import { verifyToken } from "../middleware/authMiddleware.js";
// console.log("💡 myexam.js router loaded");

// const router = express.Router();

// // 1. Get all exams created by logged-in teacher
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const exams = await Exam.find({ teacher: req.user.id });
//     res.status(200).json(exams);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching exams", error: error.message });
//   }
// });

// // 2. Get single exam details
// router.get("/:id", verifyToken, async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ _id: req.params.id, teacher: req.user.id });
//     if (!exam) return res.status(404).json({ message: "Exam not found" });
//     res.status(200).json(exam);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching exam", error: error.message });
//   }
// });

// // 3. Get exam results
// router.get("/:id/results", verifyToken, async (req, res) => {
//     console.log("💡 Results route hit for exam:", req.params.id);
//   try {
//     const results = await Result.find({ examId: req.params.id })
//       .populate("studentId", "name email");
//     res.status(200).json(results);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching results", error: error.message });
//   }
// });

// // 4. Update grade settings for exam
// router.put("/:examId/grades", verifyToken, async (req, res) => {
//   try {
//     const { gradeSettings } = req.body; 
//     const exam = await Exam.findOne({ _id: req.params.examId, teacher: req.user.id });

//     if (!exam) return res.status(404).json({ error: "Exam not found" });

//     exam.gradeSettings = gradeSettings;
//     await exam.save();

//     res.json({ message: "Grade settings updated", gradeSettings: exam.gradeSettings });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update grade settings" });
//   }
// });

// // 5. Fetch grade settings
// router.get("/:examId/grades", verifyToken, async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ _id: req.params.examId, teacher: req.user.id })
//       .select("title gradeSettings");
//     if (!exam) return res.status(404).json({ error: "Exam not found" });

//     res.json(exam.gradeSettings);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch grade settings" });
//   }
// });

// // 6. Toggle result visibility
// router.patch("/:examId/results/:resultId/toggle", verifyToken, async (req, res) => {
//   try {
//     const result = await Result.findById(req.params.resultId);
//     if (!result) return res.status(404).json({ error: "Result not found" });

//     result.visible = !result.visible;
//     await result.save();

//     res.json({ message: "Result visibility updated", visible: result.visible });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to toggle result visibility" });
//   }
// });

// export default router;
