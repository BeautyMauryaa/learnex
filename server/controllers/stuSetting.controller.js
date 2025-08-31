// import bcrypt from "bcryptjs";
// import StuSetting from "../models/stuSetting.model.js";
// import User from "../models/user.js";

// /**
//  * @desc    Get Account Info
//  * @route   GET /api/stu-setting/account
//  */
// export const getAccountInfo = async (req, res) => {
//   try {
//     const settings = await StuSetting.findOne({ user: req.user._id });
//     if (!settings) return res.status(404).json({ msg: "Settings not found" });

//     res.json({
//       fullName: settings.fullName,
//       email: settings.email,
//       mobile: settings.mobile,
//     });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// /**
//  * @desc    Update Account Info
//  * @route   PUT /api/stu-setting/account
//  */
// export const updateAccountInfo = async (req, res) => {
//   try {
//     const { fullName, email, mobile } = req.body;

//     const settings = await StuSetting.findOneAndUpdate(
//       { user: req.user._id },
//       { $set: { fullName, email, mobile } },
//       { new: true }
//     );

//     await User.findByIdAndUpdate(req.user._id, { fullName, email, mobile });

//     res.json({ msg: "Account info updated", settings });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// /**
//  * @desc    Get Preferences
//  * @route   GET /api/stu-setting/preferences
//  */
// export const getPreferences = async (req, res) => {
//   try {
//     const settings = await StuSetting.findOne({ user: req.user._id });
//     if (!settings) return res.status(404).json({ msg: "Settings not found" });

//     res.json(settings.preferences);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// /**
//  * @desc    Update Preferences
//  * @route   PUT /api/stu-setting/preferences
//  */
// export const updatePreferences = async (req, res) => {
//   try {
//     const { language, theme } = req.body;

//     const settings = await StuSetting.findOneAndUpdate(
//       { user: req.user._id },
//       { $set: { "preferences.language": language, "preferences.theme": theme } },
//       { new: true }
//     );

//     res.json({ msg: "Preferences updated", settings });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// /**
//  * @desc    Update Password
//  * @route   PUT /api/stu-setting/password
//  */
// export const updatePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Current password is wrong" });

//     const hashed = await bcrypt.hash(newPassword, 10);
//     user.password = hashed;
//     await user.save();

//     res.json({ msg: "Password updated successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// /**
//  * @desc    Get Full Settings (optional, for initial load)
//  * @route   GET /api/stu-setting
//  */
// export const getStuSettings = async (req, res) => {
//   try {
//     const settings = await StuSetting.findOne({ user: req.user._id });
//     if (!settings) return res.status(404).json({ msg: "Settings not found" });

//     res.json(settings);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };
