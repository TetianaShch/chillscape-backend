import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../controllers/authController.js';

import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/register', celebrate(registerUserSchema), asyncHandler(registerUser));
router.post('/login', celebrate(loginUserSchema), asyncHandler(loginUser));
router.post('/logout', authenticate, asyncHandler(logoutUser));
router.post('/refresh', asyncHandler(refreshUserSession));

export default router;

