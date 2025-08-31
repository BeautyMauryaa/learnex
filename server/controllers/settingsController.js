// import TeacherSettings from "../models/TeacherSettings.js";

// export const getSettings = async (req, res) => {
//   try {
//     const teacherId = req.user._id;  // ✅ Use _id
//     const settings = await TeacherSettings.findOne({ teacherId }); // ✅ safer query
//     if (!settings) {
//       return res.status(404).json({ error: "Settings not found" });
//     }
//     res.json(settings);
//   } catch (error) {
//     console.error("❌ getSettings error:", error.message);
//     res.status(500).json({ error: "Failed to fetch settings" });
//   }
// };

// export const updateSettings = async (req, res) => {
//   try {
//     const teacherId = req.user.id;
//     const updates = req.body;
//     const updated = await TeacherSettings.update(teacherId, updates);
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update settings" });
//   }
// };

// export const connectIntegration = async (req, res) => {
//   try {
//     const teacherId = req.user.id;
//     const { platform } = req.params;
//     const { token } = req.body;

//     const updated = await TeacherSettings.connectIntegration(
//       teacherId,
//       platform,
//       token
//     );
//     res.json({ message: `${platform} connected`, updated });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to connect integration" });
//   }
// };

// export const disconnectIntegration = async (req, res) => {
//   try {
//     const teacherId = req.user.id;
//     const { platform } = req.params;

//     const updated = await TeacherSettings.disconnectIntegration(
//       teacherId,
//       platform
//     );
//     res.json({ message: `${platform} disconnected`, updated });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to disconnect integration" });
//   }
// };
import TeacherSettings from "../models/TeacherSettings.js";

export const getSettings = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const settings = await TeacherSettings.findByTeacherId(teacherId);
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const updates = req.body;
    const updated = await TeacherSettings.update(teacherId, updates);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
};

export const connectIntegration = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { platform } = req.params;
    const { token } = req.body;

    const updated = await TeacherSettings.connectIntegration(
      teacherId,
      platform,
      token
    );
    res.json({ message: `${platform} connected`, updated });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect integration" });
  }
};

export const disconnectIntegration = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { platform } = req.params;

    const updated = await TeacherSettings.disconnectIntegration(
      teacherId,
      platform
    );
    res.json({ message: `${platform} disconnected`, updated });
  } catch (error) {
    res.status(500).json({ error: "Failed to disconnect integration" });
  }
};
