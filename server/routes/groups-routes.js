// src/routes/groupRoutes.js
import { Router } from "express";
import crypto from "crypto";
import mongoose from "mongoose";
import Group from "../models/Group.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Generate unique group code (6 hex chars = uppercase string)
const genCode = () => crypto.randomBytes(3).toString("hex").toUpperCase();

// Create group
router.post("/create", auth(), async (req, res) => {
  try {
    console.log("POST /api/groups/create body:", req.body, "user:", req.user);

    const name = (req.body.name || "").trim();
    if (!name) {
      return res.status(400).json({ success: false, message: "Group name is required." });
    }

    const creatorId = req.user?.id || req.body.createdBy || req.body.creator;
    if (!creatorId) {
      return res.status(400).json({ success: false, message: "createdBy (or creator) is required or you must be authenticated." });
    }

    if (!mongoose.Types.ObjectId.isValid(creatorId)) {
      return res.status(400).json({ success: false, message: "createdBy must be a valid user id (24 hex characters)." });
    }

    const code = genCode();
    const group = await Group.create({
      name,
      code,
      createdBy: mongoose.Types.ObjectId(creatorId),
      members: [mongoose.Types.ObjectId(creatorId)],
    });

    return res.status(201).json({ success: true, group });
  } catch (err) {
    console.error("Error creating group:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Join group by code
router.post("/join", auth(), async (req, res) => {
  try {
    console.log("POST /api/groups/join body:", req.body, "user:", req.user);

    const code = (req.body.code || "").trim();
    if (!code) {
      return res.status(400).json({ success: false, message: "code is required." });
    }

    const userId = req.user?.id || req.body.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required (or authenticate)." });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "userId invalid." });
    }

    const group = await Group.findOne({ code });
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found." });
    }

    const already = group.members.some(m => m.toString() === userId.toString());
    if (!already) {
      group.members.push(mongoose.Types.ObjectId(userId));
      await group.save();
    }

    return res.json({ success: true, group });
  } catch (err) {
    console.error("Error joining group:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Fetch my groups
router.get("/mine", auth(), async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Auth required." });
    }

    const groups = await Group.find({ members: userId }).sort({ updatedAt: -1 }).lean();
    return res.json({ success: true, groups });
  } catch (err) {
    console.error("Error fetching groups:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
