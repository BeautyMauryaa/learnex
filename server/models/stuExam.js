import mongoose from "mongoose";

const studentExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  time: String,
  duration: Number,
  totalMarks: Number,
  type: { type: String, enum: ["mid-term", "unit-test", "mock", "quiz"], required: true },
  proctoring: {
    webcam: { type: Boolean, default: false },
    microphone: { type: Boolean, default: false }
  },
  status: { type: String, enum: ["upcoming", "live", "completed"], default: "upcoming" },
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
const StudentExam = mongoose.models.StudentExam || mongoose.model("StudentExam", studentExamSchema);

export default StudentExam;
