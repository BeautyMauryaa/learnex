// // import mongoose from "mongoose";

// // const announcementSchema = new mongoose.Schema(
// //   {
// //     teacher: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     title: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     message: {
// //       type: String,
// //       required: true,
// //     },
// //     target: {
// //       type: String,
// //       enum: ["all", "class", "group"],
// //       default: "all",
// //     },
// //     targetId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       refPath: "target",
// //       required: function () {
// //         return this.target !== "all";
// //       },
// //     },
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model("Announcement", announcementSchema);

// import mongoose from "mongoose";

// const announcementSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },

//     // Priority: Low, Medium, High
//     priority: {
//       type: String,
//       enum: ["Low", "Medium", "High"],
//       default: "Medium",
//     },

//     // Target Audience: All Students OR Specific Groups
//     targetAudience: {
//       type: String,
//       enum: ["All Students", "Specific Groups"],
//       default: "All Students",
//     },

//     // If Specific Groups selected → e.g. ["React Group", "JavaScript Advanced"]
//     groups: [{ type: String }],

//     // Status: Draft, Published, Scheduled
//     status: {
//       type: String,
//       enum: ["Draft", "Published", "Scheduled"],
//       default: "Draft",
//     },

//     // Optional: Schedule for later
//     scheduledDate: { type: Date },

//     // Views Counter
//     views: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// const Announcement = mongoose.model("Announcement", announcementSchema);
// export default Announcement;


// models/Announcement.ts
import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  targetAudience: { type: String, enum: ['all','specific'], default: 'all' },
  targetGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudyGroup' }],
  publishDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['draft','published','scheduled'], default: 'draft' },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Announcement', AnnouncementSchema);
