import { Router } from 'express';
import { celebrate } from 'celebrate';

import { getUserLocationsSchema } from '../validations/userValidation.js';

import {
  getCurrentUserController,
  getUserByIdController,
  updateUserController,
  getUserLocations
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/current', authenticate, getCurrentUserController);
router.get('/:userId', getUserByIdController);
router.get('/:userId/locations', celebrate(getUserLocationsSchema), getUserLocations);

router.patch('/', authenticate, updateUserController);

export default router;
