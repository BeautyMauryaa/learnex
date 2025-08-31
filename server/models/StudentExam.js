import mongoose from "mongoose";

const StudentExamSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  status: { type: String, enum: ["not_started","in_progress","submitted"], default: "not_started" },
  startedAt: Date,
  submittedAt: Date,
  answers: [{ q: Number, a: mongoose.Schema.Types.Mixed }],
  score: Number
}, { timestamps: true });

// ✅ Use safe export pattern to avoid OverwriteModelError
export default mongoose.models.StudentExam || mongoose.model("StudentExam", StudentExamSchema);
