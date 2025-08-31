import mongoose from 'mongoose';

const GroupFileSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentGroup', required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: String,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('GroupFile', GroupFileSchema);
