// import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema({
//   questionText: { type: String, required: true },
//   questionType: { type: String, enum: ["MCQ", "Subjective"], required: true },
//   options: [{ type: String }], // only for MCQ
//   answer: { type: String, required: true },
//   marks: { type: Number, required: true },
// });

// // ✅ Grade schema
// const gradeSchema = new mongoose.Schema({
//   grade: { type: String, required: true }, // e.g., "A", "B"
//   minPercentage: { type: Number, required: true }, // e.g., 90
//   maxPercentage: { type: Number, required: true }, // e.g., 100
// });

// const examSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//     duration: { type: Number, required: true }, // in minutes
//     totalMarks: { type: Number, required: true },
//     deadline: { type: Date, required: true },

//     // ✅ Embedded questions
//     questions: [questionSchema],

//     // ✅ Teacher reference
//     teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

//     // ✅ Grade settings (for result grading)
//     gradeSettings: {
//       type: [gradeSchema],
//       default: [], // safe default
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Exam || mongoose.model("Exam", examSchema);



import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  questionType: { 
    type: String, 
    enum: ["MCQ", "Subjective"], 
    required: true 
  },
  options: [{ type: String }], // only for MCQ
  answer: { 
    type: String,
    required: function () {
      return this.questionType === "MCQ"; // ✅ required only for MCQ
    },
    default: "N/A" // ✅ for Subjective if teacher doesn’t provide
  },
  marks: { type: Number, required: true },
});

// ✅ Grade schema
const gradeSchema = new mongoose.Schema({
  grade: { type: String, required: true }, // e.g., "A", "B"
  minPercentage: { type: Number, required: true }, // e.g., 90
  maxPercentage: { type: Number, required: true }, // e.g., 100
});

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true }, // in minutes
    totalMarks: { type: Number, required: true },
    deadline: { type: Date, required: true },
    startTime: { type: Date, required: true },

    // ✅ Embedded questions
    questions: [questionSchema],

    // ✅ Teacher reference
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // ✅ Grade settings (for result grading)
    gradeSettings: {
      type: [gradeSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Exam || mongoose.model("Exam", examSchema);
