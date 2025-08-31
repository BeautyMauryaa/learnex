// controllers/quizSubmissionController.js
import QuizSubmission from "../models/QuizSubmission.js";

// Create new submission
export const createSubmission = async (req, res) => {
  try {
    const submission = new QuizSubmission(req.body);
    await submission.save();
    res.status(201).json({ msg: "Submission created", submission });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get all submissions
export const getSubmissions = async (req, res) => {
  try {
    const submissions = await QuizSubmission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get single submission by ID
export const getSubmission = async (req, res) => {
  try {
    const submission = await QuizSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({ msg: "Not found" });
    res.json(submission);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Update review (teacher grading)
export const reviewSubmission = async (req, res) => {
  try {
    const { answers, status } = req.body;
    let totalScore = 0;

    answers.forEach(ans => {
      totalScore += ans.pointsAwarded;
    });

    const updatedSubmission = await QuizSubmission.findByIdAndUpdate(
      req.params.id,
      { answers, totalScore, status },
      { new: true }
    );

    res.json({ msg: "Review saved", updatedSubmission });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
