import { Joi, Segments } from 'celebrate';

export const createLocationSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(3).max(96).required(),
    type: Joi.string().max(64).required(),
    region: Joi.string().max(64).required(),
    description: Joi.string().min(20).max(6000).required(),
  }),
};

export const updateLocationSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    locationId: Joi.string().hex().length(24).required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(3).max(96),
    type: Joi.string().max(64),
    region: Joi.string().max(64),
    description: Joi.string().min(20).max(6000),
    images: Joi.any(),
  }).min(1),
};
