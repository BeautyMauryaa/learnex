// import mongoose from "mongoose";

// const teacherSettingSchema = new mongoose.Schema(
//   {
//     teacherId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true, // one settings doc per teacher
//     },
//     notifications: {
//       email: { type: Boolean, default: true },
//       sms: { type: Boolean, default: false },
//     },
//     integrations: {
//       googleCalendar: {
//         connected: { type: Boolean, default: false },
//         token: { type: String, default: null },
//       },
//       zoom: {
//         connected: { type: Boolean, default: false },
//         token: { type: String, default: null },
//       },
//     },
//     theme: {
//       type: String,
//       enum: ["light", "dark"],
//       default: "light",
//     },
//   },
//   { timestamps: true }
// );

// const TeacherSettings = mongoose.model("TeacherSettings", teacherSettingSchema);

// export default TeacherSettings;

import db from "../config/db.js";

const TeacherSettings = {
  async findByTeacherId(teacherId) {
    return db("teacher_settings").where({ teacher_id: teacherId }).first();
  },

  async update(teacherId, updates) {
    await db("teacher_settings")
      .where({ teacher_id: teacherId })
      .update({ ...updates, updated_at: new Date() });

    return this.findByTeacherId(teacherId);
  },

  async connectIntegration(teacherId, platform, token) {
    let updateField = `${platform}_token`;
    let connectField = `${platform}_connected`;

    await db("teacher_settings")
      .where({ teacher_id: teacherId })
      .update({
        [updateField]: token,
        [connectField]: true,
        updated_at: new Date()
      });

    return this.findByTeacherId(teacherId);
  },

  async disconnectIntegration(teacherId, platform) {
    let updateField = `${platform}_token`;
    let connectField = `${platform}_connected`;

    await db("teacher_settings")
      .where({ teacher_id: teacherId })
      .update({
        [updateField]: null,
        [connectField]: false,
        updated_at: new Date()
      });

    return this.findByTeacherId(teacherId);
  }
};

export default TeacherSettings;
