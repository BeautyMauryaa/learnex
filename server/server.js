import express from "express";
import http from "http";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";

// 🗄️ DB + Models
import connectDB from "./config/db.js";
import GroupMessage from "./models/GroupMessage.js";

// 🛣️ Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import quizSubmissionRoutes from "./routes/quizSubmissionRoutes.js";
import studySessionRoutes from "./routes/studySessionRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import settingRoutes from "./routes/settingsRoutes.js";
import stunotesRoutes from "./routes/stunotesgener.js";
import studentExamRoutes from "./routes/studentExamRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import stuSettingRoutes from "./routes/stuSettingRoutes.js"; 
import studentRoutes from "./routes/student.routes.js";
import quizzesRoutes from "./routes/quizRoutes.js";
import askAiRoutes from "./routes/askAi.routes.js";
import studentGroupRoutes from './routes/StudentGroup.js';

// ========================================
// 🌐 ENV + APP INIT
// ========================================
dotenv.config();
console.log(">>> HuggingFace Key:", process.env.HF_API_KEY);

const app = express();
const server = http.createServer(app);

// ========================================
// 📦 MIDDLEWARE
// ========================================
// ========================================
// 📦 MIDDLEWARE (UPDATED FOR LOCAL DEV)
// ========================================
app.use(helmet({
  crossOriginResourcePolicy: false, // Prevents Helmet from blocking local media/api streams
}));
app.use(morgan("dev"));

// Complete Local + Deployed CORS fallback array
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://learnex-csvt4l41m-novas-projects-8121d3d6.vercel.app"
];

if (process.env.CLIENT_ORIGIN) {
  allowedOrigins.push(process.env.CLIENT_ORIGIN);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error(`CORS Blocked: Origin ${origin} not explicitly allowed.`), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(rateLimit({ windowMs: 60_000, max: 200 }));

// ... [Keep your database connection and routes exactly as they are] ...

// ========================================
// 🔌 SOCKET.IO (UPDATED FOR MULTIPLE ORIGINS)
// ========================================
const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // Links directly to our allowed origins array
    methods: ["GET", "POST"],
    credentials: true
  },
});

// ========================================
// 🌐 DATABASE CONNECT
// ========================================
connectDB();

// ========================================
// 📝 QUIZ MODEL
// ========================================
const quizSchema = new mongoose.Schema({
  title: String,
  subject: String,
  topic: String,
  difficulty: String,
  type: { type: String, enum: ["mcq", "subjective"] },
  totalQuestions: Number,
  questions: Array,
  score: { type: Number, default: 0 },
  timeTaken: String,
  date: { type: Date, default: Date.now },
});
const Quiz = mongoose.model("Quiz", quizSchema);

// File Upload
const upload = multer({ dest: "uploads/" });

// ========================================
// 🛣️ MAIN ROUTES
// ========================================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api", examRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/submissions", quizSubmissionRoutes);
app.use("/api/study-sessions", studySessionRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/stunotes", stunotesRoutes);
app.use("/api/student/exams", studentExamRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/stu-setting", stuSettingRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/quizzes", quizzesRoutes);
app.use("/api/student-groups", studentGroupRoutes);
app.use("/api", askAiRoutes);

// ✅ Quiz Endpoints
app.post("/api/quizzes/mcq", async (req, res) => {
  const { subject, topic, difficulty, numQuestions } = req.body;
  const questions = Array.from({ length: numQuestions }, (_, i) => ({
    id: i + 1,
    question: `Sample ${difficulty} question ${i + 1} on ${topic}`,
    options: ["A", "B", "C", "D"],
    correctAnswer: Math.floor(Math.random() * 4),
  }));
  const quiz = new Quiz({ title: `${subject} - ${topic} Quiz`, subject, topic, difficulty, type: "mcq", totalQuestions: numQuestions, questions });
  await quiz.save();
  res.json(quiz);
});

app.post("/api/quizzes/subjective", async (req, res) => {
  const { subject, topic, difficulty, totalQuestions } = req.body;
  const questions = Array.from({ length: totalQuestions }, (_, i) => ({
    id: i + 1,
    question: `Explain ${topic} in detail (Q${i + 1})`,
    marks: [2,5,10][i % 3],
  }));
  const quiz = new Quiz({ title: `${subject} - ${topic} Subjective Quiz`, subject, topic, difficulty, type: "subjective", totalQuestions, questions });
  await quiz.save();
  res.json(quiz);
});

app.get("/api/quizzes", async (req, res) => {
  const quizzes = await Quiz.find().sort({ date: -1 });
  res.json(quizzes);
});

app.get("/", (req, res) => {
  res.send("✅ Learnex Backend Running...");
});

// ========================================
// 🔌 SOCKET.IO
// ========================================
// const io = new Server(server, {
//   cors: {
//     origin: FRONTEND_URL,
//     methods: ["GET", "POST"],
//     credentials: true
//   },
// });

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("joinGroup", async (groupId) => {
    socket.join(groupId);
    console.log(`📌 User ${socket.id} joined group ${groupId}`);
    const history = await GroupMessage.find({ groupId }).sort({ createdAt: -1 }).limit(50).lean();
    socket.emit("loadHistory", history.reverse());
  });

  socket.on("sendMessage", async (data) => {
    const { groupId, senderId, text, fileUrl } = data;
    const newMsg = new GroupMessage({ groupId, senderId, text, fileUrl });
    await newMsg.save();
    io.to(groupId).emit("receiveMessage", { senderId, text, fileUrl, createdAt: newMsg.createdAt });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ========================================
// 🚀 START SERVER
// ========================================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Learnex Server + WS running on port ${PORT}`));

console.log("HF_API_KEY from env:", process.env.HF_API_KEY);

