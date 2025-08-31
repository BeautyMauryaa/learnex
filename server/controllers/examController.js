// import Exam from "../models/Exam.js";

// // Create Exam
// export const createExam = async (req, res) => {
//   try {
//     const { title, description, duration, totalMarks, deadline, questions } = req.body;

//     const exam = new Exam({
//       title,
//       description,
//       duration,
//       totalMarks,
//       deadline,
//       questions,
//       teacher: req.user.id, // from verifyToken
//     });

//     await exam.save();
//     res.status(201).json(exam);
//   } catch (error) {
//     console.error("❌ Error creating exam:", error);
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };

// // Get Exams for Teacher
// export const getTeacherExams = async (req, res) => {
//   try {
//     const exams = await Exam.find({ teacher: req.user.id });
//     res.json(exams);
//   } catch (error) {
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };

// // Update Exam
// export const updateExam = async (req, res) => {
//   try {
//     const exam = await Exam.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     if (!exam) return res.status(404).json({ msg: "Exam not found" });
//     res.json(exam);
//   } catch (error) {
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };

// // Delete Exam
// export const deleteExam = async (req, res) => {
//   try {
//     const exam = await Exam.findByIdAndDelete(req.params.id);
//     if (!exam) return res.status(404).json({ msg: "Exam not found" });
//     res.json({ msg: "Exam deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };

import Exam from "../models/Exam.js";

// Create Exam
export const createExam = async (req, res) => {
  try {
    const { title, description, duration, totalMarks, deadline, questions } = req.body;

    if (!title || !duration || !totalMarks || !questions || questions.length === 0) {
      return res.status(400).json({ msg: "All required fields must be provided" });
    }

    const exam = new Exam({
      title,
      description,
      duration,
      totalMarks,
      deadline,
      questions,
      teacher: req.user.id, // from verifyToken middleware
    });

    await exam.save();
    res.status(201).json({ msg: "Exam created successfully", exam });
  } catch (error) {
    console.error("❌ Error creating exam:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get All Exams of Logged-in Teacher
export const getTeacherExams = async (req, res) => {
  try {
    const exams = await Exam.find({ teacher: req.user.id }).sort({ createdAt: -1 });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get Single Exam (useful for frontend exam details page)
export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ msg: "Exam not found" });

    // Only allow teacher who created it to view/edit
    if (exam.teacher.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    res.json(exam);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Update Exam
export const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ msg: "Exam not found" });

    if (exam.teacher.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const updatedExam = await Exam.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json({ msg: "Exam updated successfully", exam: updatedExam });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Delete Exam
export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ msg: "Exam not found" });

    if (exam.teacher.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await exam.deleteOne();
    res.json({ msg: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
