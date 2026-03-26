import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';

import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

router.post(
  '/auth/register',
  celebrate(registerUserSchema),
  asyncHandler(registerUser),
);
router.post('/auth/login', celebrate(loginUserSchema), asyncHandler(loginUser));
router.post('/auth/logout', asyncHandler(logoutUser));

export default router;
