import Group from "../models/Group.js";
import crypto from "crypto";

// Generate unique group code
const generateCode = () => crypto.randomBytes(3).toString("hex").toUpperCase();

// ✅ Create a new group
export const createGroup = async (req, res) => {
  try {
    const { name, userId } = req.body;  // userId = creator (student/teacher)

    const code = generateCode();

    const group = await Group.create({
      name,
      code,
      createdBy: userId,
      members: [userId]
    });

    res.status(201).json({ success: true, group });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Join group with code
export const joinGroup = async (req, res) => {
  try {
    const { code, userId } = req.body;

    const group = await Group.findOne({ code });
    if (!group) {
      return res.status(404).json({ success: false, message: "Group not found" });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({ success: false, message: "Already a member" });
    }

    group.members.push(userId);
    await group.save();

    res.status(200).json({ success: true, group });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
