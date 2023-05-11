import express from 'express';
import { getUsers } from '../controllers/userController';

const userRouter = express.Router();

userRouter.route('/list').get(getUsers);

export default userRouter;
