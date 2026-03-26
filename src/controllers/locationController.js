import { Location } from '../models/location.js'; 


export const getAllLocations = async (req, res, next) => {
  try {
    const { page = 1, limit = 9, region, type, search } = req.query;

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
