import jwt from "jsonwebtoken";
import User from "../models/user.js";

// ✅ Main protect middleware: attach user object to req.user
export const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      if (!token) throw new Error("No token provided");

      // decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.id) throw new Error("Invalid token payload");

      const user = await User.findById(decoded.id).select("-password");
      if (!user) throw new Error("User not found");

      req.user = user; // attach full user object
      return next();
    }

    throw new Error("Authorization header missing or invalid");
  } catch (err) {
    console.error("❌ Auth error:", err.message);
    return res.status(401).json({ message: "Not authorized: " + err.message });
  }
};

// ✅ Verify JWT token only
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "No token provided or bad format" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Only allow teachers
export const verifyTeacher = (req, res, next) => {
  if (!req.user || req.user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied: Teachers only" });
  }
  next();
};

export default protect;
