// / Libraries
import { Router } from 'express';
import { celebrate } from 'celebrate';
// / Validations
import { getLocationSchema } from '../validations/userValidation.js';
// / Controllers
import {
  getLocations,
  getCurrentUserController,
  getUserByIdController,
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

// ! GET
router.get('/api/users', celebrate(getLocationSchema), getLocations);
router.get('/current', authenticate, getCurrentUserController);
router.get('/:userId', getUserByIdController);

export default router;