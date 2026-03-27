import express from 'express';
import {
  getCurrentUserController,
  getUserByIdController,
} from '../controllers/userController.js';
import authenticate from '../middlewares/authenticate.js';

const userRoutes = express.Router();

userRoutes.get('/current', authenticate, getCurrentUserController);
userRoutes.get('/:userId', getUserByIdController);

export default userRoutes;
