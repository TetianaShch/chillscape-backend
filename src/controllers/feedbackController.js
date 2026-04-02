import Feedback from '../models/feedback.js';
import { User } from '../models/user.js';
import { Location } from '../models/location.js';
import LocationType from '../models/locationType.js';

const getLocationTypesMap = async () => {
  const locationTypes = await LocationType.find().select('slug type').lean();
  return new Map(locationTypes.map((item) => [item.slug, item.type]));
};

export const getLatestFeedbacks = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const limitNumber = Number(limit);

    const slugToTypeMap = await getLocationTypesMap();

    const locations = await Location.find({
      feedbacksId: { $exists: true, $ne: [] },
    })
      .select('locationType feedbacksId')
      .populate({
        path: 'feedbacksId',
        select: 'rate description userName createdAt',
      })
      .lean();

    const feedbacks = locations
      .flatMap((location) =>
        (location.feedbacksId || []).map((feedback) => ({
          ...feedback,
          place: {
            type: slugToTypeMap.get(location.locationType) || '',
          },
        })),
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limitNumber);

    res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
};

export const getFeedbacks = async (req, res, next) => {
  try {
    const { placeId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const slugToTypeMap = await getLocationTypesMap();

    const [location, locationForCount] = await Promise.all([
      Location.findById(placeId)
        .select('locationType feedbacksId')
        .populate({
          path: 'feedbacksId',
          select: 'rate description userName createdAt',
          options: {
            sort: { createdAt: -1 },
            skip,
            limit: limitNumber,
          },
        })
        .lean(),

      Location.findById(placeId).select('feedbacksId').lean(),
    ]);

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const totalFeedbacks = locationForCount?.feedbacksId?.length || 0;
    const totalPages = Math.ceil(totalFeedbacks / limitNumber);

    const feedbacks = (location.feedbacksId || []).map((feedback) => ({
      ...feedback,
      place: {
        type: slugToTypeMap.get(location.locationType) || '',
      },
    }));

    res.status(200).json({
      page: pageNumber,
      perPage: limitNumber,
      totalFeedbacks,
      totalPages,
      feedbacks,
    });
  } catch (error) {
    next(error);
  }
};

export const createFeedback = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('name');

    const feedback = await Feedback.create({
      rate: req.body.rate,
      description: req.body.description,
      userName: user?.name || 'Невідомий автор',
    });

    await Location.findByIdAndUpdate(req.body.place, {
      $push: { feedbacksId: feedback._id },
    });

    const location = await Location.findById(req.body.place)
      .select('locationType')
      .lean();

    const slugToTypeMap = await getLocationTypesMap();

    res.status(201).json({
      ...feedback.toObject(),
      place: {
        type: slugToTypeMap.get(location?.locationType) || '',
      },
    });
  } catch (error) {
    next(error);
  }
};
