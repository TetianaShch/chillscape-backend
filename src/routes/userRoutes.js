import express from 'express';
import {
  getCurrentUserController,
  getUserByIdController,
} from '../controllers/userController.js';
import authenticate from '../middlewares/authenticate.js';

const userRouter = express.Router();

userRouter.get('/current', authenticate, getCurrentUserController); //need exact name of the auth middleware
userRouter.get('/:userId', getUserByIdController);

export default userRouter;
