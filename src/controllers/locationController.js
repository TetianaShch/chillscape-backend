import { Location } from '../models/location.js';
import createHttpError from 'http-errors';

export const getAllLocations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, region, type, search } = req.query;

    const filter = {};

    if (region) filter.region = region;
    if (type) filter.type = type;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const skip = (page - 1) * limit;

    const [locations, totalLocations] = await Promise.all([
      Location.find(filter).skip(skip).limit(Number(limit)),
      Location.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalLocations / limit);

    res.status(200).json({
      page: Number(page),
      perPage: Number(limit),
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
    const data = await Location.findById(locationId);
    if (!data) throw createHttpError(404, 'Location not found');
    res.json({ status: 200, message: `Successfully found location with id ${locationId}!`, data });
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
      return next(createHttpError(403, 'Forbidden: You are not the author of this article'));
    }

    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      req.body,
      { new: true } // Повертає вже оновлений документ
    );

    res.status(200).json({
      status: 200,
      message: "Successfully patched a location!",
      data: updatedLocation,
    });
  } catch (error) {
    next(error);
  }
};
