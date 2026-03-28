import { Joi, Segments } from 'celebrate';


export const getAllLocationsSchema = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
    region: Joi.string().optional(),
    type: Joi.string().optional(),
    search: Joi.string().allow('').optional(),
  }),
};
export const getLocationIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    locationId: Joi.string().hex().length(24).required(),
  }),
};
export const createLocationSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(3).max(96).required(),
    type: Joi.string().max(64).required(),
    region: Joi.string().max(64).required(),
    description: Joi.string().min(20).max(6000).required(),
    images: Joi.array().items(Joi.string()).min(1).required(),
  }),
};

export const updateLocationSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(3).max(96),
    type: Joi.string().max(64),
    region: Joi.string().max(64),
    description: Joi.string().min(20).max(6000),
    images: Joi.array().items(Joi.string()).min(1),
  }),
};




