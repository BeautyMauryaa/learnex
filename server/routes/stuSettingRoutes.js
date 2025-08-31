import express from "express";
import multer from "multer";

import { protect, verifyTeacher } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer config for file uploads
const upload = multer({ dest: "uploads/" });

// 🔹 Get student settings
router.get("/", protect, async (req, res) => {
  try {
    const user = req.user; // comes from protect middleware
    res.json({ message: "Student settings fetched successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Update account info
router.put("/account", protect, async (req, res) => {
  try {
    // your logic for updating account info
    res.json({ message: "Account updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Update password
router.put("/password", protect, async (req, res) => {
  try {
    // your logic for updating password
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Update preferences
router.put("/preferences", protect, async (req, res) => {
  try {
    // your logic for updating preferences
    res.json({ message: "Preferences updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Upload documents
router.post(
  "/documents",
  protect,
  upload.single("document"),
  async (req, res) => {
    try {
      // your logic for handling uploaded document
      res.json({
        message: "Document uploaded successfully",
        file: req.file,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
