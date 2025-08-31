import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["assignment", "exam", "general"], default: "general" },
  referenceId: { type: mongoose.Schema.Types.ObjectId }, // link to assignment/exam if needed
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
