// / Library
import { Schema, model } from 'mongoose';

const locationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, maxlength: 64 },
    locationType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 64,
    },
    region: { type: String, required: true, trim: true, maxlength: 64 },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 6000,
    },
    images: [{ type: String, required: true }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    feedbacksId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
      },
    ],
  },

  { timestamps: true },
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
