import OpenAI from "openai";
import Note from "../models/stunotesgener.js";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
//import pdfParse from "pdf-parse";

dotenv.config();

// OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Multer setup (to use in routes)
export const upload = multer({ dest: "uploads/" });

// -------------------- Upload File & Generate Notes --------------------
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let textContent = "";

    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(dataBuffer);
      textContent = pdfData.text;
    } else if (req.file.mimetype === "text/plain") {
      textContent = fs.readFileSync(req.file.path, "utf-8");
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    // Call OpenAI to summarize notes
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a smart note generator for students." },
        { role: "user", content: `Generate concise notes from this content:\n\n${textContent}` },
      ],
    });

    res.json({ notes: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error generating notes:", error);
    res.status(500).json({ error: "Failed to generate notes" });
  }
};

// -------------------- Generate Notes From Topic --------------------
export const generateNotes = async (req, res) => {
  try {
    const { topic, studentId } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful study assistant." },
        { role: "user", content: `Generate clear, structured study notes on: ${topic}` },
      ],
    });

    const notesContent = response.choices[0].message.content;

    const newNote = new Note({
      studentId,
      topic,
      content: notesContent,
    });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error generating notes:", error);
    res.status(500).json({ error: "Failed to generate notes" });
  }
};

// -------------------- Get All Notes --------------------
export const getNotes = async (req, res) => {
  try {
    const { studentId } = req.query;
    const filter = studentId ? { studentId } : {};

    const notes = await Note.find(filter);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// -------------------- Get Note By ID --------------------
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch note" });
  }
};

// -------------------- Update Note --------------------
export const updateNote = async (req, res) => {
  try {
    const { topic, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { topic, content },
      { new: true }
    );

    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
};

// -------------------- Delete Note --------------------
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};
