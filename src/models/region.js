import { Schema, model } from 'mongoose';

const regionsSchema = new Schema(
  {
    region: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    level: {
      type: String,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const Region = model('Region', regionsSchema);
export default Region;
