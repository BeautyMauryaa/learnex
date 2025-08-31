import express from "express";
import { uploadFile } from "../controllers/stunotesgenerController.js";
import multer from "multer";
import {
  generateNotes,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} from "../controllers/stunotesgenerController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", generateNotes);         // Create note
router.get("/", getNotes);               // Get all notes (filter by studentId)
router.get("/:id", getNoteById);         // Get note by ID
router.put("/:id", updateNote);          // Update note
router.delete("/:id", deleteNote);       // Delete note
router.post("/notes/upload", upload.single("file"), uploadFile);

export default router;
