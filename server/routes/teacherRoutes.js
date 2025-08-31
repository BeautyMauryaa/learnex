import express from "express";
import {
  createTeacher,
  getProfile,
  updateProfile,
  changePassword,
  getStatistics,
  getAchievements,
  addAchievement,
  deleteAchievement,
  updateNotifications,
  updatePrivacy,
  updatePreferences,
  deactivateAccount,
  deleteAccount
} from "../controllers/teacherController.js";

const router = express.Router();

// ---------------- Teacher Account ----------------

// Create new teacher
router.post("/", createTeacher);

// Profile
router.get("/:id/profile", getProfile);
router.put("/:id/profile", updateProfile);

// Change password
router.put("/:id/change-password", changePassword);

// Statistics
router.get("/:id/statistics", getStatistics);

// Achievements
router.get("/:id/achievements", getAchievements);
router.post("/:id/achievements", addAchievement);
router.delete("/:id/achievements/:achievementId", deleteAchievement);

// Notifications
router.put("/:id/notifications", updateNotifications);

// Privacy
router.put("/:id/privacy", updatePrivacy);

// Preferences
router.put("/:id/preferences", updatePreferences);

// Deactivate Account
router.put("/:id/deactivate", deactivateAccount);

// Delete Account
router.delete("/:id", deleteAccount);

export default router;
