import express from "express";
import { createAssignment, getTeacherAssignments, updateAssignment, deleteAssignment } from "../controllers/assignmentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createAssignment);
router.get("/", verifyToken, getTeacherAssignments);
router.put("/:id", verifyToken, updateAssignment);
router.delete("/:id", verifyToken, deleteAssignment);

export default router;
