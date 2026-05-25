import Assignment from "../models/Assignment.js";

// ✅ Create Assignment
export const createAssignment = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create assignments" });
    }

    const { title, description, deadline, fileUrl } = req.body;

    const assignment = new Assignment({
      title,
      description,
      deadline,
      fileUrl,
      teacher: req.user.id
    });

    const savedAssignment = await assignment.save();
    res.status(201).json(savedAssignment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all assignments by logged-in teacher
export const getTeacherAssignments = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can view their assignments" });
    }

    const assignments = await Assignment.find({ teacher: req.user.id });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Assignment
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({ _id: req.params.id, teacher: req.user.id });

    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    assignment.title = req.body.title || assignment.title;
    assignment.description = req.body.description || assignment.description;
    assignment.deadline = req.body.deadline || assignment.deadline;
    assignment.fileUrl = req.body.fileUrl || assignment.fileUrl;

    const updatedAssignment = await assignment.save();
    res.json(updatedAssignment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Assignment
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndDelete({ _id: req.params.id, teacher: req.user.id });

    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
