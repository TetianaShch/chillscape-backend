import User from '../models/user.js';

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select('_id username email avatar');
  return user;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select('_id username avatar');
  return user;
};
