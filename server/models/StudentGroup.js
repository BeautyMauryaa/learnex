import mongoose from 'mongoose';

const GroupMemberSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  avatar: String,
});

const StudentGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  joinCode: { type: String, unique: true },
  members: [GroupMemberSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('StudentGroup', StudentGroupSchema);
