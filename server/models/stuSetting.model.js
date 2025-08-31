import mongoose from "mongoose";

const stuSettingSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // same as user _id
  fullName: String,
  email: String,
  role: { type: String, default: "Student" },
  preferences: {
    language: { type: String, default: "English" },
    theme: { type: String, default: "Light" },
    testDuration: { type: Number, default: 60 },
    difficulty: { type: String, default: "Adaptive" },
    timeFormat: { type: String, default: "12 Hour" },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: false },
      reminders: { type: Boolean, default: true }
    }
  }
});

export default mongoose.model("StuSetting", stuSettingSchema);
