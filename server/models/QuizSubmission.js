// models/QuizSubmission.js
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  question: { type: String, required: true },
  studentAnswer: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  pointsAwarded: { type: Number, default: 0 },
  maxPoints: { type: Number, required: true },
  feedback: { type: String, default: "" }
});

const quizSubmissionSchema = new mongoose.Schema(
  {
    quizTitle: { type: String, required: true },
    studentName: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    submittedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Graded"],
      default: "Pending"
    },
    totalScore: { type: Number, default: 0 },
    maxScore: { type: Number, required: true },
    answers: [answerSchema]
  },
  { timestamps: true }
);

export default mongoose.model("QuizSubmission", quizSubmissionSchema);
