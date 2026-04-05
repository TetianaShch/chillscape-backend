import { Location } from '../models/location.js';
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

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

    if (sort === 'alphabet_asc') {
      sortOption = { name: 1 };
    }

    if (sort === 'alphabet_desc') {
      sortOption = { name: -1 };
    }

    const [locations, totalLocations] = await Promise.all([
      Location.find(filter)
        .collation({ locale: 'uk', strength: 1 })
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber),
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
    const userId = req.user._id;
    let imageUrl = '';

    if (req.file) {
      const result = await saveFileToCloudinary(req.file.buffer, `create_${Date.now()}`);
      imageUrl = result.secure_url;
    }

    // Передаємо ownerId замість createdBy
    const location = await Location.create({
      ...req.body,
      image: imageUrl,
      ownerId: userId,
    });

    res.status(201).json({
      status: 201,
      message: "Successfully created!",
      data: location, // Повертаємо весь об'єкт, щоб фронтенд міг взяти _id
    });
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  const { locationId } = req.params;
  const userId = req.user._id;

  try {
    const location = await Location.findById(locationId);

    if (!location) {
      return next(createHttpError(404, 'Location not found'));
    }

    // Перевірка авторства через ownerId
    if (location.ownerId.toString() !== userId.toString()) {
      return next(createHttpError(403, 'Forbidden: You are not the owner of this location'));
    }

    const updateData = { ...req.body };

    // Обробка ОДНІЄЇ нової картинки
    if (req.file) {
      const result = await saveFileToCloudinary(req.file.buffer, `update_${locationId}_${Date.now()}`);
      updateData.image = result.secure_url;
    }

    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      updateData, // Використовуємо підготовлений об'єкт з картинкою
      { new: true, runValidators: true }
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
