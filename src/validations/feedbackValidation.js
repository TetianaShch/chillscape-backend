import { Joi, Segments } from 'celebrate';

export const getFeedbacksSchema = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1).optional(),
    limit: Joi.number().integer().min(1).max(50).default(10).optional(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    placeId: Joi.string().hex().length(24).required(),
  }),
};

export const createFeedbackSchema = {
  [Segments.BODY]: Joi.object().keys({
    place: Joi.string().hex().length(24).required(),
    rate: Joi.number().min(1).max(5).required(),
    description: Joi.string().min(3).max(500).required(),
  }),
};
