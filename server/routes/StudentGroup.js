import express from 'express';
import StudentGroup from '../models/StudentGroup.js';
import User from '../models/user.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Helper to get userId safely
const getUserId = (user) => user?._id || user?.id;

// Get all groups for logged-in student
router.get('/', protect, async (req, res) => {
  try {
    const userId = getUserId(req.user);
    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    // Check if user exists in group members
    const groups = await StudentGroup.find({ "members._id": userId });
    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch groups' });
  }
});

// Create a new group
router.post('/', protect, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Group name required' });

    const userId = getUserId(req.user);
    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    const joinCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    const newGroup = new StudentGroup({
      name,
      joinCode,
      members: [{
        _id: userId,
        name: req.user.name,
        email: req.user.email,
        status: 'online',
        avatar: req.user.name ? req.user.name[0] : 'U'
      }],
      createdBy: userId,
    });

    await newGroup.save();
    res.json(newGroup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create group' });
  }
});

// Join a group using joinCode
router.post('/join', protect, async (req, res) => {
  try {
    const { joinCode } = req.body;
    const userId = getUserId(req.user);
    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    const group = await StudentGroup.findOne({ joinCode });
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const alreadyMember = group.members.find(m => m._id.toString() === userId.toString());
    if (!alreadyMember) {
      group.members.push({
        _id: userId,
        name: req.user.name,
        email: req.user.email,
        status: 'online',
        avatar: req.user.name ? req.user.name[0] : 'U'
      });
      await group.save();
    }

    res.json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to join group' });
  }
});

// Invite member (send email + shareable link)
router.post('/:groupId/invite', protect, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { email } = req.body; // optional email

    const group = await StudentGroup.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    // Generate shareable link
    const link = `${process.env.FRONTEND_URL}/group-join?code=${group.joinCode}`;

    // If email is provided, send invitation
    if (email) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Invite to join group: ${group.name}`,
        text: `Join the group using this link: ${link}`
      });
    }

    res.json({ joinCode: group.joinCode, link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send invite' });
  }
});

export default router;
