// / Library
import { Schema, model } from 'mongoose';

const locationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true, versionKey: false },
);

locationSchema.index(
  { name: 'text' },
  {
    name: 'LocationTextIndex',
    weights: { name: 10 },
    default_language: 'ukrainian',
  },
);

export const Location = model('Location', locationSchema);
