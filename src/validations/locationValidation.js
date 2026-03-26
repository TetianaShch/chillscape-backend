import { Joi, Segments } from 'celebrate';


export const getAllLocationsSchema = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(9),
    region: Joi.string().optional(),
    type: Joi.string().optional(),
    search: Joi.string().allow('').optional(),
  }),
};

export const createLocationSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(1).required(),
    region: Joi.string().required(),
    type: Joi.string().required(),
     description: Joi.string().allow('').optional(),
    }),
};
