import { Joi, Segments } from 'celebrate';

// ! GET
export const getUserLocationsSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).default(1),
    limit: Joi.number().min(1).max(100).default(10),
  }),
};
