import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from "../middlewares/multer.js";
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
  updateLocationSchema
} from '../validations/locationValidation.js';

const router = Router();

router.get('/', celebrate(getAllLocationsSchema), getAllLocations);
router.get('/:locationId', celebrate(getLocationIdSchema), getLocationById);

// ВАЖЛИВО: upload.single('image') стоїть ПЕРЕД celebrate
router.post(
  '/add',
  authenticate,
  upload.array('images', 5), // Дозволяємо завантажувати до 5 зображень
  celebrate(createLocationSchema),
  createLocation
);

// Для оновлення також додаємо можливість змінити фото
router.patch(
  '/:locationId',
  authenticate,
  upload.array('images', 5), // Дозволяємо завантажувати до 5 зображень
  celebrate(updateLocationSchema),
  updateLocation
);

export default router;
