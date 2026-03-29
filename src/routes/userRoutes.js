// / Libraries
import { Router } from 'express';
import { celebrate } from 'celebrate';
// / Validations
import { getUserLocationsSchema } from '../validations/userValidation.js';
// / Controllers
import {
  getCurrentUserController,
  getUserByIdController,
  getUserLocations,
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

// ! GET
router.get('/current', authenticate, getCurrentUserController);
router.get('/:userId', getUserByIdController);
router.get('/:userId/locations', celebrate(getUserLocationsSchema), getUserLocations);

export default router;
