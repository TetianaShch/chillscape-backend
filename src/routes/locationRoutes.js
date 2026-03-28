import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getAllLocations,
  createLocation,
  updateLocation,
  getLocationById
  } from '../controllers/locationController.js';
import {
  getAllLocationsSchema,
  createLocationSchema,
  getLocationIdSchema,
} from '../validations/locationValidation.js';

const router = Router();

router.get('/', celebrate(getAllLocationsSchema), getAllLocations);
router.get('/:locationId', celebrate(getLocationIdSchema), getLocationById);
router.post('/', authenticate, celebrate(createLocationSchema), createLocation);
router.patch('/:locationId', authenticate, celebrate(), updateLocation);

export default router;

