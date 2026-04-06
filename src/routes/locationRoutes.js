import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
import { uploadLocationImage } from '../middlewares/upload.js';
import {
  getAllLocations,
  createLocation,
  updateLocation,
  getLocationById,
} from '../controllers/locationController.js';
import {
  getAllLocationsSchema,
  createLocationSchema,
  getLocationIdSchema,
  updateLocationSchema,
} from '../validations/locationValidation.js';

const router = Router();

router.get('/', celebrate(getAllLocationsSchema), getAllLocations);
router.get('/:locationId', celebrate(getLocationIdSchema), getLocationById);

router.post(
  '/',
  authenticate,
  uploadLocationImage,
  celebrate(createLocationSchema),
  createLocation,
);

router.patch(
  '/:locationId',
  authenticate,
  uploadLocationImage,
  celebrate(updateLocationSchema),
  updateLocation,
);

export default router;
