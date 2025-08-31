// import express from "express";
// import Exam from "../models/Exam.js";
// import Result from "../models/Result.js";
// import { verifyToken } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/:id", async (req, res) => {
//   try {
//     const exam = await Exam.findById(req.params.id);
//     if (!exam) return res.status(404).json({ msg: "Exam not found" });
//     res.json(exam);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // ========================
// // 1️⃣ Create Exam
// // POST /api/teacher/exams
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     if (req.user.role !== "teacher")
//       return res.status(403).json({ msg: "Only teachers can create exams" });

//     const { title, description, duration, totalMarks, deadline, questions, gradeSettings } = req.body;

//     const exam = new Exam({
//       title,
//       description,
//       duration,
//       totalMarks,
//       deadline,
//       questions,
//       gradeSettings,
//       teacher: req.user._id
//     });

//     const savedExam = await exam.save();
//     res.status(201).json(savedExam);
//   } catch (error) {
//     console.error("Exam creation error:", error);
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// });

// // ========================
// // 2️⃣ Get all exams for logged-in teacher
// // GET /api/teacher/exams
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const exams = await Exam.find({ teacher: req.user._id });
//     res.status(200).json(exams);
//   } catch (error) {
//     res.status(500).json({ msg: "Error fetching exams", error: error.message });
//   }
// });

// // ========================
// // 3️⃣ Get single exam details
// // GET /api/teacher/exams/:id
// router.get("/:id", async (req, res) => {
//   try {
//     const exam = await Exam.findById(req.params.id);
//     if (!exam) return res.status(404).json({ msg: "Exam not found" });
//     res.json(exam);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // ========================
// // 4️⃣ Get exam results
// // GET /api/teacher/exams/:id/results
// router.get("/:id/results", verifyToken, async (req, res) => {
//   try {
//     const results = await Result.find({ examId: req.params.id }).populate("studentId", "name email");
//     res.status(200).json(results);
//   } catch (error) {
//     res.status(500).json({ msg: "Error fetching results", error: error.message });
//   }
// });

// // ========================
// // 5️⃣ Update exam
// // PUT /api/teacher/exams/:id
// router.put("/:id", verifyToken, async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ _id: req.params.id, teacher: req.user._id });
//     if (!exam) return res.status(404).json({ msg: "Exam not found" });

//     Object.assign(exam, req.body); // updates any fields sent in body
//     const updatedExam = await exam.save();
//     res.json(updatedExam);
//   } catch (error) {
//     res.status(500).json({ msg: "Error updating exam", error: error.message });
//   }
// });

// // ========================
// // 6️⃣ Delete exam
// // DELETE /api/teacher/exams/:id
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     const exam = await Exam.findOneAndDelete({ _id: req.params.id, teacher: req.user._id });
//     if (!exam) return res.status(404).json({ msg: "Exam not found" });
//     res.json({ msg: "Exam deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ msg: "Error deleting exam", error: error.message });
//   }
// });

// // ========================
// // 7️⃣ Update grade settings
// // PUT /api/teacher/exams/:id/grades
// router.put("/:id/grades", verifyToken, async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ _id: req.params.id, teacher: req.user._id });
//     if (!exam) return res.status(404).json({ msg: "Exam not found" });

//     exam.gradeSettings = req.body.gradeSettings || [];
//     await exam.save();

//     res.json({ msg: "Grade settings updated", gradeSettings: exam.gradeSettings });
//   } catch (error) {
//     res.status(500).json({ msg: "Error updating grade settings", error: error.message });
//   }
// });

// // ========================
// // 8️⃣ Fetch grade settings
// // GET /api/teacher/exams/:id/grades
// router.get("/:id/grades", verifyToken, async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ _id: req.params.id, teacher: req.user._id }).select("title gradeSettings");
//     if (!exam) return res.status(404).json({ msg: "Exam not found" });

//     res.json(exam.gradeSettings);
//   } catch (error) {
//     res.status(500).json({ msg: "Error fetching grade settings", error: error.message });
//   }
// });

// // ========================
// // 9️⃣ Toggle result visibility
// // PATCH /api/teacher/exams/:id/results/:resultId/toggle
// router.patch("/:id/results/:resultId/toggle", verifyToken, async (req, res) => {
//   try {
//     const result = await Result.findById(req.params.resultId);
//     if (!result) return res.status(404).json({ msg: "Result not found" });

//     result.visible = !result.visible;
//     await result.save();

//     res.json({ msg: "Result visibility updated", visible: result.visible });
//   } catch (error) {
//     res.status(500).json({ msg: "Error toggling result visibility", error: error.message });
//   }
// });

// export default router;



import express from "express";
import Exam from "../models/Exam.js";

const router = express.Router();

// ✅ Get all exams (for students)
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find()
      .select("title description deadline totalMarks duration") // only safe fields
      .populate("teacher", "name email"); // show teacher name if needed

    res.json(exams);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
