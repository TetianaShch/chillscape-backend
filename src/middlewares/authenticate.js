import createHttpError from 'http-errors';
import User from '../models/user.js'; 

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw createHttpError(401, 'Missing Authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) throw createHttpError(401, 'Token not provided');

    const user = await User.findById(token);
    if (!user) throw createHttpError(401, 'User not found');


    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
