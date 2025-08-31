// models/Student.js
import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String },
  dateOfBirth: { type: Date },
  school: { type: String },
  class: { type: String },
  stream: { type: String },
  preferences: {
    notifications: { type: Boolean, default: true },
    theme: { type: String, enum: ["light", "dark"], default: "light" },
  },
  documents: [
    {
      name: String,
      url: String,
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Student", StudentSchema);
