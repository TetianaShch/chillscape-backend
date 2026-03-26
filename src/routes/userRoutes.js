// / Libraries
import { Router } from 'express';
import { celebrate } from 'celebrate';
// / Validations
import { getLocationSchema } from '../validations/userValidation.js';
// / Controllers
import { getLocations } from '../controllers/userController.js';

const router = Router();

// ! GET
router.get('/api/users', celebrate(getLocationSchema), getLocations);

export default router;
