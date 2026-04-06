import { Location } from '../models/location.js';
import createHttpError from 'http-errors';

const getUploadedImageUrl = (req) => {
  const file =
    req.files?.photo?.[0] || req.files?.image?.[0] || req.files?.images?.[0];

  if (!file) return null;

  const baseUrl =
    process.env.APP_DOMAIN || `${req.protocol}://${req.get('host')}`;

  return `${baseUrl}/uploads/${file.filename}`;
};

export const getAllLocations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, region, type, search, sort } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const matchStage = {};

    if (region) matchStage.region = region;
    if (type) matchStage.locationType = type;
    if (search) {
      matchStage.name = { $regex: search, $options: 'i' };
    }

    let sortStage = { _id: 1 };

    if (sort === 'rating') {
      sortStage = { rate: -1, _id: 1 };
    }

    if (sort === 'newest') {
      sortStage = { createdAt: -1, _id: 1 };
    }

    if (sort === 'alphabet_asc') {
      sortStage = { name: 1, _id: 1 };
    }

    if (sort === 'alphabet_desc') {
      sortStage = { name: -1, _id: 1 };
    }

    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'feedbacks',
          localField: 'feedbacksId',
          foreignField: '_id',
          as: 'feedbacks',
        },
      },
      {
        $addFields: {
          rate: {
            $ifNull: [{ $avg: '$feedbacks.rate' }, 0],
          },
        },
      },
      {
        $project: {
          feedbacks: 0,
        },
      },
      { $sort: sortStage },
      { $skip: skip },
      { $limit: limitNumber },
    ];

    const [locations, totalLocations] = await Promise.all([
      Location.aggregate(pipeline).collation({ locale: 'uk', strength: 1 }),
      Location.countDocuments(matchStage),
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

    if (!location) {
      throw createHttpError(404, 'Location not found');
    }

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
    const imageUrl = getUploadedImageUrl(req);

    if (!imageUrl) {
      throw createHttpError(400, 'Image is required');
    }

    const location = await Location.create({
      ...req.body,
      images: [imageUrl],
      ownerId: req.user._id,
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

    if (location.ownerId.toString() !== userId.toString()) {
      return next(
        createHttpError(
          403,
          'Forbidden: You are not the author of this article',
        ),
      );
    }

    const imageUrl = getUploadedImageUrl(req);

    const updateData = {
      ...req.body,
    };

    if (imageUrl) {
      updateData.images = [imageUrl];
    }

    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      updateData,
      { new: true },
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
