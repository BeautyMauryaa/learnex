import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  studentId: { type: String, required: true }, // later link with auth
  title: { type: String, required: true },
  subject: { type: String },
  content: { type: String, required: true },
  readTime: { type: String }, // e.g., "5 min read"
  createdAt: { type: Date, default: Date.now }
});

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;
