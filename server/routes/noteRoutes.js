// import express from "express";
// import multer from "multer";
// import { 
//   createNote, 
//   getNotes, 
//   uploadNote, 
//   toggleNoteVisibility, 
//   deleteNote, 
//   downloadNote 
// } from "../controllers/noteController.js";   // ✅ import once only
// import { verifyToken } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });
// const upload = multer({ storage });

// // routes
// router.post("/create", verifyToken, createNote);
// router.get("/", verifyToken, getNotes);

// router.post("/upload", verifyToken, upload.single("file"), uploadNote);
// router.patch("/:id/toggle", verifyToken, toggleNoteVisibility);
// router.delete("/:id", verifyToken, deleteNote);
// router.get("/:id/download", verifyToken, downloadNote);

// export default router;


import express from 'express';
import multer from 'multer';
import Note from '../models/Note.js';
import fs from 'fs';
const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ uploadDate: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload new note
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, description, subject, isPublic } = req.body;
    if (!req.file) return res.status(400).json({ error: 'File is required' });

    const newNote = new Note({
      title,
      description,
      subject,
      isPublic: isPublic === 'true',
      fileUrl: req.file.path,
      fileType: req.file.originalname.split('.').pop(),
      fileSize: (req.file.size / (1024 * 1024)).toFixed(2) + ' MB'
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });

    // Delete file from uploads folder
    fs.unlinkSync(note.fileUrl);

    await note.remove();
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle Public/Private
router.patch('/:id/toggle', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });

    note.isPublic = !note.isPublic;
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

