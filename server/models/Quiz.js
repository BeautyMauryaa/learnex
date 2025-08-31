import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String], // for MCQ
  correctAnswer: Number, // index of correct answer
  answer: String, // for Subjective
  points: { type: Number, default: 1 },
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, enum: ["MCQ", "Subjective"], required: true },
    questions: [questionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
