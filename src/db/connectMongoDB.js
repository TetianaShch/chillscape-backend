import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  const mongoUrl = process.env.MONGO_URL;
  console.log('✅ MongoDB connection established successfully');

  if (!mongoUrl) {
    throw new Error('MONGO_URL is not defined');
  }

  await mongoose.connect(mongoUrl);
};

export default connectMongoDB;

