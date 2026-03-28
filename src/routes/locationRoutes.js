import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
// TODO: перевірити правильність імпортів (назви експортів і шляхи) після реалізації контролерів і схем

import {
  getLocations,
  getLocationById,
  createLocation,
  deleteLocation,
  updateLocation,
} from '../controllers/locationController.js';

import {
  getLocationsSchema,
  locationIdParamSchema,
  createLocationSchema,
  updateLocationSchema,
} from '../validations/locationValidation.js';



const router = Router();
//public routes
router.get('/test', (req, res) => {
  res.json({ message: "Маршрут працює!" });
});
router.get('/locations', celebrate(getLocationsSchema), getLocations);
router.get(
  '/locations/:locationId',
  celebrate(locationIdParamSchema),
  getLocationById,
);

router.use('/locations', authenticate);

router.post('/locations', celebrate(createLocationSchema), createLocation);
router.delete(
  '/locations/:locationId',
  celebrate(locationIdParamSchema),
  deleteLocation,
);
router.patch(
  '/locations/:locationId',
  authenticate,
  upload.array('images'),
  celebrate(updateLocationSchema),
  updateLocation
);

export default router;
