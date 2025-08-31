// // models/Note.js
// import mongoose from "mongoose";

// const noteSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     subject: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       trim: true,
//     },
//     fileUrl: {
//       type: String, // will store uploaded file path (S3 / local / cloudinary)
//       required: true,
//     },
//     fileType: {
//       type: String, // pdf, doc, ppt, etc.
//       required: true,
//     },
//     fileSize: {
//       type: Number, // size in bytes
//     },
//     isPublic: {
//       type: Boolean,
//       default: true,
//     },
//     downloads: {
//       type: Number,
//       default: 0,
//     },
//     uploadedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Teacher reference
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Note", noteSchema);


import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subject: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['pdf','doc','docx','ppt','pptx'], required: true },
  fileSize: { type: String },
  uploadDate: { type: Date, default: Date.now },
  downloads: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: true }
});

export default mongoose.model('Note', NoteSchema);
