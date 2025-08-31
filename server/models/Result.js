import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },

    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam.questions" },
        givenAnswer: String,
        isCorrect: Boolean,
        obtainedMarks: Number,
      },
    ],

    // ✅ Calculated grade (e.g., "A", "B", etc.)
    grade: { type: String, default: null },

    // ✅ Teacher can hide/unhide result
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
