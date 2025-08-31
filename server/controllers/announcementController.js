// import Announcement from "../models/Announcement.js";

// // ✅ Create Announcement
// export const createAnnouncement = async (req, res) => {
//   try {
//     const { title, message, target, targetId } = req.body;

//     const announcement = await Announcement.create({
//       teacher: req.user.id,
//       title,
//       message,
//       target,
//       targetId,
//     });

//     res.status(201).json({ msg: "Announcement created", announcement });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // ✅ Get All Announcements by Teacher
// export const getMyAnnouncements = async (req, res) => {
//   try {
//     const announcements = await Announcement.find({ teacher: req.user.id })
//       .sort({ createdAt: -1 })
//       .lean();

//     res.json(announcements);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // ✅ Update Announcement
// export const updateAnnouncement = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, message } = req.body;

//     const announcement = await Announcement.findOneAndUpdate(
//       { _id: id, teacher: req.user.id },
//       { title, message },
//       { new: true }
//     );

//     if (!announcement) return res.status(404).json({ msg: "Not found" });

//     res.json({ msg: "Updated successfully", announcement });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// // ✅ Delete Announcement
// export const deleteAnnouncement = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const announcement = await Announcement.findOneAndDelete({
//       _id: id,
//       teacher: req.user.id,
//     });

//     if (!announcement) return res.status(404).json({ msg: "Not found" });

//     res.json({ msg: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

import Announcement from "../models/Announcement.js";

// Create Announcement
export const createAnnouncement = async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.status(201).json({ message: "Announcement created", announcement });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all announcements
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single announcement by ID
export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: "Not found" });

    // increment views count
    announcement.views += 1;
    await announcement.save();

    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
