import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
  {
    place: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Feedback = model("Feedback", feedbackSchema);
export default Feedback;
