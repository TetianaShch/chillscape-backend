import User from '../models/user.js';

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select('_id name email avatar'); //need exact names from user model
  return user;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select('_id name avatar'); //need exact names from user model
  return user;
};
