import { Location } from '../models/location.js';

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
