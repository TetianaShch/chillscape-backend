import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select('_id name email avatar');
  return user;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select('_id name avatar');
  return user;
};

export const updateUser = async (userId, payload) => {
  const { name, email, password, avatar } = payload;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (avatar) user.avatar = avatar;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
};
