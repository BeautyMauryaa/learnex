import StudentGroup from "../models/StudentGroup.js";

// Helper to generate a random join code
const generateJoinCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// Create a new group
export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const joinCode = generateJoinCode();
    const group = new StudentGroup({
      name,
      joinCode,
      createdBy: req.user._id,
      members: [req.user._id]
    });
    const savedGroup = await group.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Invite member to group
export const inviteMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { email } = req.body; // friend’s email

    const group = await StudentGroup.findById(groupId);
    if (!group) return res.status(404).json({ msg: "Group not found" });

    // check ownership
    if (group.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Only group owner can invite" });
    }

    // generate joinCode if not exists
    if (!group.joinCode) {
      group.joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      await group.save();
    }

    // TODO: send email/notification (for now just return joinCode)
    res.json({ msg: "Invite sent", joinCode: group.joinCode });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};


// Join an existing group by code
export const joinGroup = async (req, res) => {
  try {
    const { joinCode } = req.body;
    const group = await StudentGroup.findOne({ joinCode });
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Prevent duplicate join
    if (group.members.includes(req.user._id)) {
      return res.status(400).json({ message: "Already in the group" });
    }

    group.members.push(req.user._id);
    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all groups the student is part of
export const getGroups = async (req, res) => {
  try {
    const groups = await StudentGroup.find({ members: req.user._id }).populate('members', 'name email');
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


