import Feedback from "../models/Feedback.js";

// ✅ Create Feedback
export const giveFeedback = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can give feedback" });
    }

    const { student, type, referenceId, message } = req.body;

    const feedback = new Feedback({
      teacher: req.user.id,
      student,
      type,
      referenceId,
      message
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Feedback given by Teacher
export const getTeacherFeedback = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can view this" });
    }

    const feedbacks = await Feedback.find({ teacher: req.user.id })
      .populate("student", "name email");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Feedback for a Student
export const getStudentFeedback = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can view their feedback" });
    }

    const feedbacks = await Feedback.find({ student: req.user.id })
      .populate("teacher", "name email");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
