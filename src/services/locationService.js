import Location from '../models/locationModel.js';

export const getUserLocationsService = async ({ userId, page, limit }) => {
  const skip = (page - 1) * limit;

  const [locations, total] = await Promise.all([
    Location.find({ createdBy: userId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),

    Location.countDocuments({ createdBy: userId }),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    locations,
  };
};
