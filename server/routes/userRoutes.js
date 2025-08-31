import express from "express";
import { getProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route: requires valid JWT
router.get("/profile", verifyToken, getProfile);

export default router;
