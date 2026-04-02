import { Schema, model } from 'mongoose';

const locationTypeSchema = new Schema(
  {
    type: {
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
    shortDescription: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false, collection: 'location_types' },
);

const LocationType = model('LocationType', locationTypeSchema);
export default LocationType;
