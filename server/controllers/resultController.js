// controllers/resultController.js
import Result from "../models/Result.js";
import Exam from "../models/Exam.js";

// ✅ Create new result with grade assignment
export const createResult = async (req, res) => {
  try {
    const { examId, studentId, score, answers } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // calculate percentage
    const percentage = (score / exam.totalMarks) * 100;

    // find grade
    let assignedGrade = null;
    if (exam.gradeSettings && exam.gradeSettings.length > 0) {
      for (const g of exam.gradeSettings) {
        if (percentage >= g.minPercentage && percentage <= g.maxPercentage) {
          assignedGrade = g.grade;
          break;
        }
      }
    }

    const result = new Result({
      exam: examId,
      student: studentId,
      score,
      answers,
      grade: assignedGrade, // ✅ auto grade
    });

    await result.save();
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating result:", error);
    res.status(500).json({ message: "Server error" });
  }
};
