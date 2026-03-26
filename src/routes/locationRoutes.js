import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getAllLocations,
  createLocation,
} from '../controllers/locationController.js';

import {
  getAllLocationsSchema,
  createLocationSchema,
} from '../validations/locationValidation.js';

const router = Router();

router.get('/', celebrate(getAllLocationsSchema), getAllLocations);

router.post('/', authenticate, celebrate(createLocationSchema), createLocation);


export default router;
