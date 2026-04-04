import { Location } from '../models/location.js';
import createHttpError from 'http-errors';

export const getAllLocations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, region, type, search, sort } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = {};

    if (region) filter.region = region;
    if (type) filter.locationType = type;
    if (search) filter.name = { $regex: search, $options: 'i' };

    let sortOption = {};

    if (sort === 'rating') {
      sortOption = { rate: -1 };
    }

    if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    }

    const [locations, totalLocations] = await Promise.all([
      Location.find(filter).sort(sortOption).skip(skip).limit(limitNumber),
      Location.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalLocations / limitNumber);

    res.status(200).json({
      status: 200,
      message: 'Successfully found locations!',
      page: pageNumber,
      perPage: limitNumber,
      totalLocations,
      totalPages,
      locations,
    });
  } catch (error) {
    next(error);
  }
};

export const getLocationById = async (req, res, next) => {
  const { locationId } = req.params;
  try {
    const location = await Location.findById(locationId);
    if (!location) throw createHttpError(404, 'Location not found');
    res.json({
      status: 200,
      message: `Successfully found location with id ${locationId}!`,
      data: location,
    });
  } catch (error) {
    next(error);
  }
};
export const createLocation = async (req, res, next) => {
  try {
    const location = await Location.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(location);
  } catch (error) {
    next(error);
  }
};
export const updateLocation = async (req, res, next) => {
  const { locationId } = req.params;
  const userId = req.user._id; // Отримуємо ID з мидлвара authenticate

  try {
    const location = await Location.findById(locationId);

    if (!location) {
      return next(createHttpError(404, 'Location not found'));
    }

    // ПЕРЕВІРКА АВТОРСТВА: порівнюємо ID з поля createdBy з ID юзера
    if (location.createdBy.toString() !== userId.toString()) {
      return next(
        createHttpError(
          403,
          'Forbidden: You are not the author of this article',
        ),
      );
    }

    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      req.body,
      { new: true }, // Повертає вже оновлений документ
    );

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a location!',
      data: updatedLocation,
    });
  } catch (error) {
    next(error);
  }
};
