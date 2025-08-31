import e from "express";
import StudySession from "../models/StudySession.js";

// ✅ Helper: auto update status
const updateStatus = (session) => {
  const now = new Date();
  const start = new Date(session.scheduledDateTime);
  const end = new Date(start.getTime() + session.duration * 60000);

  if (now < start) {
    session.status = "Scheduled";
  } else if (now >= start && now <= end) {
    session.status = "Active";
  } else {
    session.status = "Completed";
  }
  return session;
};

// ✅ Create new session (teacher or student)
export const createSession = async (req, res) => {
  try {
    const body = {
      ...req.body,
      scheduledDateTime: req.body.scheduledDateTime || req.body.scheduledDate,
      createdBy: req.user._id, // ✅ attach teacher ID
    };

    const session = new StudySession(body);
    const savedSession = await session.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all sessions with updated status
export const getAllSessions = async (req, res) => {
  try {
    let sessions = await StudySession.find().populate("createdBy", "name email role");
    sessions = sessions.map((s) => updateStatus(s));
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get a single session
export const getSessionById = async (req, res) => {
  try {
    let session = await StudySession.findById(req.params.id).populate("createdBy", "name email role");
    if (!session) return res.status(404).json({ message: "Session not found" });

    session = updateStatus(session);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Update session
export const updateSession = async (req, res) => {
  try {
    let session = await StudySession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this session" });
    }

    Object.assign(session, req.body);
    const updatedSession = await session.save();

    res.status(200).json(updateStatus(updatedSession));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete session
export const deleteSession = async (req, res) => {
  try {
    const session = await StudySession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this session" });
    }

    await session.deleteOne();
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Join session
// export const joinSession = async (req, res) => {
//   try {
//     const { id, name, role } = req.body; // pass participant info
//     const session = await StudySession.findById(req.params.id);

//     if (!session) return res.status(404).json({ message: "Session not found" });

//     // Prevent duplicate joins
//     if (session.participants.some((p) => p.id?.toString() === id)) {
//       return res.status(400).json({ message: "Participant already joined" });
//     }

//     // Check if session is full
//     if (session.participants.length >= session.maxParticipants) {
//       return res.status(400).json({ message: "Session is full" });
//     }

//     // Add participant
//     session.participants.push({ id, name, role: role || "student" });
//     await session.save();

//     res.status(200).json({
//       message: "Joined session successfully",
//       session,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// ✅ Leave session
export const joinSession = async (req, res) => {
  try {
    const { participant } = req.body;
    const session = await StudySession.findById(req.params.id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.participants.includes(participant)) {
      return res.status(400).json({ message: "Participant already joined" });
    }

    if (session.participants.length >= session.maxParticipants) {
      return res.status(400).json({ message: "Session is full" });
    }

    session.participants.push(participant);
    await session.save();

    res.status(200).json({ message: "Joined session successfully", session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Leave session
export const leaveSession = async (req, res) => {
  try {
    const { participant } = req.body;
    const session = await StudySession.findById(req.params.id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (!session.participants.includes(participant)) {
      return res.status(400).json({ message: "Participant not in session" });
    }

    session.participants = session.participants.filter((p) => p !== participant);
    await session.save();

    res.status(200).json({ message: "Left session successfully", session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};