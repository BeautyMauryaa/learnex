import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  title: { type: String, required: true },
  description: String,
  date_awarded: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Achievement", achievementSchema);
