// import express from "express";
// import { signup, login } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/signup", (req, res, next) => {
//   console.log("➡️ /api/auth/signup hit");
//   next();
// }, signup);

// router.post("/login", (req, res, next) => {
//   console.log("➡️ /api/auth/login hit");
//   next();
// }, login);

// export default router;

import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
