import createHttpError from '../utils/createHttpError.js';
import { getCurrentUser, getUserById } from '../services/userService.js';

export const getCurrentUserController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await getCurrentUser(userId);

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found current user',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found user',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
