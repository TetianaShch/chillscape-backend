import createHttpError from 'http-errors';
import { Location } from '../models/location.js';
import { getCurrentUser, getUserById } from '../services/userService.js';

// ! GET
export const getUserLocations = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page, limit, search, sortBy, sortOrder } = req.query;

    const skip = (page - 1) * limit;

    const filter = {
      createdBy: userId,
    };

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const [totalItems, locations] = await Promise.all([
      Location.countDocuments(filter),
      Location.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched user locations',
      data: {
        page,
        limit,
        totalItems,
        totalPages,
        locations,
      },
    });
  } catch (error) {
    next(error);
  }
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
