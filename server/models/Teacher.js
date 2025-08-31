import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now }
});

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // ✅ Profile Info
  subject: { type: String },
  bio: { type: String },

  // ✅ Achievements
  achievements: [achievementSchema],

  // ✅ Statistics (example: total students, courses taught, etc.)
  statistics: {
    totalStudents: { type: Number, default: 0 },
    totalCourses: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }
  },

  // ✅ Notifications
  notifications: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true }
  },

  // ✅ Privacy Settings
  privacy: {
    showEmail: { type: Boolean, default: false },
    showProfile: { type: Boolean, default: true }
  },

  // ✅ Preferences (theme, language, etc.)
  preferences: {
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    language: { type: String, default: "en" }
  },

  // ✅ Account Status
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
