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
    const locationData = { ...req.body };

   // 1. Перевіряємо, чи є файли в req.files
    const files = req.files || [];

    // 2. Завантажуємо ВСІ файли в Cloudinary паралельно
    // Ми використовуємо Promise.all, щоб не чекати кожну картинку по черзі
    const uploadPromises = files.map((file, index) => {
      // Передаємо буфер та унікальний ID (наприклад, назва + індекс)
      return saveFileToCloudinary(file.buffer, `${Date.now()}_${index}`);
    });

    const uploadResults = await Promise.all(uploadPromises);

    // 3. Витягуємо URL з результатів Cloudinary
    const imageUrls = uploadResults.map(result => result.secure_url);

    // 4. Створюємо запис у БД
    const location = await Location.create({
      ...locationData,
      images: imageUrls, // Тепер тут буде масив посилань
      createdBy: req.user._id,
    });

    res.status(201).json(location);
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

    // 1. ПЕРЕВІРКА АВТОРСТВА
    if (location.createdBy.toString() !== userId.toString()) {
      return next(
        createHttpError(
          403,
          'Forbidden: You are not the author of this article',
        ),
      );
    }

    // 2. ОБРОБКА НОВИХ КАРТИНОК (якщо вони прийшли)
    let newImageUrls = [];
    if (req.files && req.files.length > 0) {
      // Завантажуємо масив буферів у Cloudinary
      const uploadPromises = req.files.map((file, index) =>
        saveFileToCloudinary(file.buffer, `${locationId}_update_${Date.now()}_${index}`)
      );

      const cloudinaryResults = await Promise.all(uploadPromises);
      // Дістаємо посилання secure_url з результатів
      newImageUrls = cloudinaryResults.map(result => result.secure_url);
    }

    // 3. ФОРМУЄМО ДАНІ ДЛЯ ОНОВЛЕННЯ
    const updateData = { ...req.body };

    // Якщо прийшли нові фото, додаємо їх до масиву існуючих
    if (newImageUrls.length > 0) {
      updateData.images = [...location.images, ...newImageUrls];
    }

    // 4. ОНОВЛЕННЯ В БАЗІ
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
