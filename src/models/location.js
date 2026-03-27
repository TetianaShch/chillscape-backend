import { Schema, model } from 'mongoose';

const locationSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 96 },
  type: { type: String, required: true, maxlength: 64 },
  region: { type: String, required: true, maxlength: 64 },
  description: { type: String, required: true, minlength: 20, maxlength: 6000 },
  images: [{ type: String, required: true }], // Здесь будут ссылки на файлы
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
}, { timestamps: true });

export default model('location', locationSchema);
