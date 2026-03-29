import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
  {
    place: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
feedbackSchema.index({ place: 1, user: 1 }, { unique: true });
const Feedback = model("Feedback", feedbackSchema);
export default Feedback;
