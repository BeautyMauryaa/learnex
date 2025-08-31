import express from "express";
import { giveFeedback, getTeacherFeedback, getStudentFeedback } from "../controllers/feedbackController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, giveFeedback); // Teacher gives feedback
router.get("/teacher", verifyToken, getTeacherFeedback); // Teacher views all feedbacks
router.get("/student", verifyToken, getStudentFeedback); // Student views their feedback

export default router;
