// routes/quizSubmissionRoutes.js
import express from "express";
import {
  createSubmission,
  getSubmissions,
  getSubmission,
  reviewSubmission
} from "../controllers/quizSubmissionController.js";

const router = express.Router();

router.post("/", createSubmission);       // Create new submission
router.get("/", getSubmissions);          // Get all submissions
router.get("/:id", getSubmission);        // Get single submission
router.put("/:id/review", reviewSubmission); // Teacher review

export default router;
