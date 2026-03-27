import { Joi, Segments } from 'celebrate';
import mongoose from 'mongoose';

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
    name: Joi.string().min(3).max(96).required(),
    type: Joi.string().max(64).required(),
    region: Joi.string().max(64).required(),
    description: Joi.string().min(20).max(6000).required(),
    images: Joi.any().required(), 
  }),
};

export const locationIdParamSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    locationId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('Invalid locationId');
        }
        return value;
      }),
  }),
};

export const updateLocationSchema = {
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().min(3).max(96).optional(),
      type: Joi.string().max(64).optional(),
      region: Joi.string().max(64).optional(),
      description: Joi.string().min(20).max(6000).optional(),
      images: Joi.any().optional(), 
    })
    .min(1),
};
