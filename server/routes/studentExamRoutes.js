import express from "express";
import { getStudentExams, getExamDetails, startExam, submitExam } from "../controllers/studentExamController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getStudentExams);
router.get("/:examId", protect, getExamDetails);
router.post("/:examId/start", protect, startExam);
router.post("/:examId/submit", protect, submitExam);

export default router;
