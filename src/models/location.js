import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String },
  type: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Location = mongoose.model('Location', locationSchema);