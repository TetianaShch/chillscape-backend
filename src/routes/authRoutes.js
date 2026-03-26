import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = Router();

const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/auth/register', asyncHandler(registerUser));
router.post('/auth/login', asyncHandler(loginUser));

export default router;
