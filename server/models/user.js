import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // <-- backend uses 'name'
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], required: true },

  // Teacher fields
  institution: { type: String },
  subject: { type: String },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
