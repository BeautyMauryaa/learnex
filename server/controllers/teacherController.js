import Teacher from "../models/Teacher.js";
import bcrypt from "bcrypt";

// ✅ Create Teacher
export const createTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({
      name,
      email,
      password: hashedPassword,
    });

    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Profile
export const getProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).select("-password");
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Profile
export const updateProfile = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");
    res.json(updatedTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Change Password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const teacher = await Teacher.findById(req.params.id);

    const isMatch = await bcrypt.compare(oldPassword, teacher.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid old password" });

    teacher.password = await bcrypt.hash(newPassword, 10);
    await teacher.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Statistics
export const getStatistics = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    res.json(teacher.statistics || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Achievements
export const getAchievements = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    res.json(teacher.achievements || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addAchievement = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    teacher.achievements.push(req.body); // { title, date, description }
    await teacher.save();
    res.json(teacher.achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    teacher.achievements = teacher.achievements.filter(
      (a) => a._id.toString() !== req.params.achievementId
    );
    await teacher.save();
    res.json(teacher.achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Notifications
export const updateNotifications = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { notifications: req.body },
      { new: true }
    );
    res.json(teacher.notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Privacy
export const updatePrivacy = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { privacy: req.body },
      { new: true }
    );
    res.json(teacher.privacy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Preferences
export const updatePreferences = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { preferences: req.body },
      { new: true }
    );
    res.json(teacher.preferences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Deactivate Account
export const deactivateAccount = async (req, res) => {
  try {
    await Teacher.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Account deactivated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Account
export const deleteAccount = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Account deleted permanently" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
