import Exam from "../models/stuExam.js";
import StudentExam from "../models/StudentExam.js";

// Get all exams for a student
export const getStudentExams = async (req, res) => {
  try {
    const studentId = req.user.id; // from auth middleware
    const exams = await StudentExam.find({ studentId })
      .populate("examId")
      .sort({ createdAt: -1 });

    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get details of a specific exam
export const getExamDetails = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Start exam
export const startExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const studentId = req.user.id;

    const studentExam = await StudentExam.findOne({ studentId, examId });
    if (!studentExam) return res.status(404).json({ message: "Exam not assigned" });

    studentExam.status = "in-progress";
    await studentExam.save();

    res.status(200).json({ message: "Exam started", studentExam });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Submit exam
export const submitExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const studentId = req.user.id;

    const studentExam = await StudentExam.findOne({ studentId, examId });
    if (!studentExam) return res.status(404).json({ message: "Exam not assigned" });

    studentExam.status = "submitted";
    studentExam.submittedAt = new Date();
    studentExam.marksObtained = req.body.marks || 0;
    await studentExam.save();

    res.status(200).json({ message: "Exam submitted", studentExam });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
