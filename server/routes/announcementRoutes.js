// import express from "express";
// import {
//   createAnnouncement,
//   getAllAnnouncements,
//   getAnnouncementById,
//   updateAnnouncement,
//   deleteAnnouncement,
// } from "../controllers/announcementController.js";

// const router = express.Router();

// router.post("/", createAnnouncement);
// router.get("/", getAllAnnouncements);
// router.get("/:id", getAnnouncementById);
// router.put("/:id", updateAnnouncement);
// router.delete("/:id", deleteAnnouncement);

// export default router;


// routes/announcement.ts
import express from 'express';
import Announcement from '../models/Announcement.js';
const router = express.Router();

// GET all announcements (populate group names)
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('targetGroups', 'title');
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create announcement
router.post('/', async (req, res) => {
  try {
    const ann = new Announcement(req.body);
    await ann.save();
    const populatedAnn = await ann.populate('targetGroups', 'title');
    res.status(201).json(populatedAnn);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH publish announcement
router.patch('/:id/publish', async (req, res) => {
  try {
    const ann = await Announcement.findByIdAndUpdate(
      req.params.id,
      { status: 'published', publishDate: new Date() },
      { new: true }
    ).populate('targetGroups', 'title');
    res.json(ann);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH edit announcement
router.patch('/:id', async (req, res) => {
  try {
    const ann = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('targetGroups', 'title');
    res.json(ann);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE announcement
router.delete('/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
