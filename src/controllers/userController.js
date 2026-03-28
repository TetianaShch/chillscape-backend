import createHttpError from 'http-errors';
import { Location } from '../models/location.js';
import { getCurrentUser, getUserById } from '../services/userService.js';

// ! GET
export const getLocations = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;

  const skip = (page - 1) * limit;

  const locationsQuery = Location.find({ userId: req.user._id });

  if (search) locationsQuery.where({ name: { $regex: search, $options: 'i' } });

  const [totalItems, locations] = await Promise.all([
    locationsQuery.clone().countDocuments(),
    locationsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  res.status(200).json({ page, limit, totalItems, totalPages, locations });
};

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
