import express from 'express';
import { getUsers } from '../controllers/userController';

const userRouter = express.Router();

userRouter.route('/all').get(getUsers);

export default userRouter;
