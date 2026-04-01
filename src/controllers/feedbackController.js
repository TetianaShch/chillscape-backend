import Feedback from "../models/feedback.js";

export const getFeedbacks = async (req, res, next) => {
  try {
    const { placeId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const [feedbacks, totalFeedbacks] = await Promise.all([
      Feedback.find({ place: placeId })
        .populate("user", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),

      Feedback.countDocuments({ place: placeId }),
    ]);

    const totalPages = Math.ceil(totalFeedbacks / limit);

    res.status(200).json({
      page: Number(page),
      perPage: Number(limit),
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
    const feedback = await Feedback.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};
