import express from 'express';
import multer from 'multer';
import GroupFile from '../models/GroupFile.js';
import GroupQuiz from '../models/GroupQuiz.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Upload file
router.post('/:groupId/files', authMiddleware, upload.single('file'), async (req, res) => {
  const { groupId } = req.params;
  const file = new GroupFile({
    groupId,
    uploadedBy: req.user.id,
    filename: req.file.originalname,
    fileUrl: `/uploads/${req.file.filename}`
  });
  await file.save();
  res.json(file);
});

// Get group files
router.get('/:groupId/files', authMiddleware, async (req, res) => {
  const files = await GroupFile.find({ groupId: req.params.groupId });
  res.json(files);
});

// Create quiz
router.post('/:groupId/quizzes', authMiddleware, async (req, res) => {
  const { title, questions } = req.body;
  const quiz = new GroupQuiz({ groupId: req.params.groupId, title, questions, createdBy: req.user.id });
  await quiz.save();
  res.json(quiz);
});

// Get group quizzes
router.get('/:groupId/quizzes', authMiddleware, async (req, res) => {
  const quizzes = await GroupQuiz.find({ groupId: req.params.groupId });
  res.json(quizzes);
});

export default router;
