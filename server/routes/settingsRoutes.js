import express from "express";
import { 
  getSettings, 
  updateSettings, 
  connectIntegration, 
  disconnectIntegration 
} from "../controllers/settingsController.js";

import { verifyToken, verifyTeacher } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ All routes require token + teacher role
router.get("/", verifyToken, verifyTeacher, getSettings);
router.put("/", verifyToken, verifyTeacher, updateSettings);
router.post("/connect/:platform", verifyToken, verifyTeacher, connectIntegration);
router.delete("/disconnect/:platform", verifyToken, verifyTeacher, disconnectIntegration);

export default router;
