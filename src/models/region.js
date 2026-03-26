import { Schema, model } from "mongoose";

const regionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

const Region = model('Region', regionSchema);
export default Region;