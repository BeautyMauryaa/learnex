import express from "express";
import StudySession from "../models/StudySession.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new study session
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, subject, scheduledDateTime, maxParticipants } = req.body;

    const session = new StudySession({
      title,
      description,
      subject,
      scheduledDateTime,
      maxParticipants,
      createdBy: req.user._id,
      participants: [req.user._id],
    });

    await session.save();
    res.json(session);
  } catch (err) {
    console.error("❌ Create error:", err.message);
    res.status(500).json({ message: "Failed to create session" });
  }
});

// Join session by code
router.post("/join", protect, async (req, res) => {
  try {
    const { code } = req.body;

    const session = await StudySession.findOne({ code });
    if (!session) return res.status(404).json({ message: "Session not found" });

    // Check participant limit
    if (session.participants.length >= session.maxParticipants) {
      return res.status(400).json({ message: "Session is full" });
    }

    // Prevent duplicate join
    if (!session.participants.includes(req.user._id.toString())) {
      session.participants.push(req.user._id);
      await session.save();
    }

    res.json(session);
  } catch (err) {
    console.error("❌ Join error:", err.message);
    res.status(500).json({ message: "Failed to join session" });
  }
});

export default router;
