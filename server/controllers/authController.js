import User from "../models/user.js";
import StuSetting from "../models/stuSetting.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ---------------- SIGNUP ----------------
export const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      role,
      institution,
      subjects,
    } = req.body;

    // Passwords match check
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name: username, // <-- map frontend 'username' to backend 'name'
      email,
      password: hashedPassword,
      role,
      institution: role === "teacher" ? institution : undefined,
      subject: role === "teacher" ? subjects : undefined,
    });

    await newUser.save();

    // Auto-create settings for students
    if (role === "student") {
      const newSetting = new StuSetting({
        _id: newUser._id,
        fullName: username,
        email,
        role: "Student",
        preferences: {
          language: "English",
          theme: "Light",
          testDuration: 60,
          difficulty: "Adaptive",
          timeFormat: "12 Hour",
          notifications: { email: true, push: false, reminders: true },
        },
      });
      await newSetting.save();
    }

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (user.role !== role.toLowerCase()) {
      return res.status(400).json({
        message: "Role mismatch"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error"
    });
  }
};