import { Joi, Segments } from 'celebrate';

// ! GET
export const getLocationSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    search: Joi.string().trim().allow(''),
    sortBy: Joi.string().valid('_id', 'name'),
    sortOrder: Joi.string().valid('asc', 'desc'),
  }),
};
