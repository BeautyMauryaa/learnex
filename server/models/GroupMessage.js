import mongoose from 'mongoose'
const MessageSchema = new mongoose.Schema({
groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', index: true },
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
text: { type: String, trim: true },
files: [{ name: String, url: String }], // optional future use
type: { type: String, enum: ['text','system'], default: 'text' }
}, { timestamps: true })
export default mongoose.models.Message || mongoose.model('Message', MessageSchema)