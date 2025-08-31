// import mongoose from "mongoose";

// const studySessionSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     subject: { type: String, required: true },
//     description: { type: String },
//     maxParticipants: { type: Number, required: true, default: 10 },
//     participants: [{ type: String }], // Names, emails, or IDs
//     scheduledDateTime: { type: Date, required: true },
//     duration: { type: Number, required: true }, // in minutes
//     status: {
//       type: String,
//       enum: ["Scheduled", "Active", "Completed"],
//       default: "Scheduled",
//     },
//   },
//   { timestamps: true }
// );

// const StudySession = mongoose.model("StudySession", studySessionSchema);
// export default StudySession;



import mongoose from "mongoose";

const studySessionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String },
    maxParticipants: { type: Number, required: true, default: 10 },

    // ✅ participants are linked to User collection
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],

    scheduledDateTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes

    status: {
      type: String,
      enum: ["Scheduled", "Active", "Completed"],
      default: "Scheduled",
    },

    // ✅ ownership → teacher who created session
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Optional: ensure no duplicate participants
studySessionSchema.index(
  { _id: 1, "participants": 1 },
  { unique: true, sparse: true }
);

const StudySession = mongoose.model("StudySession", studySessionSchema);
export default StudySession;
