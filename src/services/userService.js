import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Location } from '../models/location.js';
import bcrypt from 'bcrypt';

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select('_id name email avatarUrl');

  if (!user) return null;

  const articlesAmount = await Location.countDocuments({ ownerId: userId });

  return {
    ...user.toObject(),
    articlesAmount,
  };
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select('_id name avatarUrl');

  if (!user) return null;

  const articlesAmount = await Location.countDocuments({ ownerId: userId });

  return {
    ...user.toObject(),
    articlesAmount,
  };
};

export const updateUser = async (userId, payload) => {
  const { name, email, password, avatarUrl } = payload;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (avatarUrl) user.avatarUrl = avatarUrl;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();

  const articlesAmount = await Location.countDocuments({ ownerId: userId });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    articlesAmount,
  };
};
