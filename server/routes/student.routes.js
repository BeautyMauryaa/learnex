// routes/student.routes.js
import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// ✅ Get profile
router.get("/me", async (req, res) => {
  try {
    // Later replace with req.user._id after auth
    const student = await Student.findOne({ email: "test@example.com" });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update profile/settings
router.put("/me", async (req, res) => {
  try {
    const updates = req.body;
    const student = await Student.findOneAndUpdate(
      { email: "test@example.com" }, // later replace with req.user._id
      updates,
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Upload certificate/document
router.post("/me/documents", async (req, res) => {
  try {
    const { name, url } = req.body; // in real app, use multer/cloudinary for file uploads
    const student = await Student.findOneAndUpdate(
      { email: "test@example.com" },
      { $push: { documents: { name, url } } },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
