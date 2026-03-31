import { Joi, Segments } from 'celebrate';

// ! GET
export const getUserLocationsSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(5).max(20).default(10),
    search: Joi.string().trim().allow(''),
    sortBy: Joi.string().valid('_id', 'name'),
    sortOrder: Joi.string().valid('asc', 'desc'),
  }),
};
