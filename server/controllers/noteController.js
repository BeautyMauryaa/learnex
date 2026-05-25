import Note from "../models/Note.js";
import path from "path";
import fs from "fs";

// Create Note (without file upload)
export const createNote = async (req, res) => {
  try {
    const { title, subject, description, isPublic } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ message: "Title and Subject are required" });
    }

    const newNote = new Note({
      title,
      subject,
      description,
      isPublic: isPublic ?? false,
      uploadedBy: req.user.id, // from auth middleware
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Upload Note (with file)
export const uploadNote = async (req, res) => {
  try {
    const { title, subject, description, isPublic } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const newNote = new Note({
      title,
      subject,
      description,
      isPublic: isPublic ?? false,
      uploadedBy: req.user.id,
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: path.extname(req.file.originalname).substring(1),
      fileSize: req.file.size,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get Notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("uploadedBy", "name email");
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Toggle Public/Private
export const toggleNoteVisibility = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.isPublic = !note.isPublic;
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete Note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    // remove file if exists
    const filePath = path.join("uploads", path.basename(note.fileUrl));
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("File delete error:", err);
      });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Download Note (increment counter)
export const downloadNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.downloads += 1;
    await note.save();

    const filePath = path.join("uploads", path.basename(note.fileUrl));
    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
