import { Router } from 'express';
import { celebrate } from 'celebrate';
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
router.post('/logout', asyncHandler(logoutUser));
router.post('/refresh', asyncHandler(refreshUserSession));

export default router;
