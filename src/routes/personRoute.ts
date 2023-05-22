import express from 'express';
import { getPersons, postNewPerson } from '../controllers/personController';

const userRouter = express.Router();

userRouter.route('/all').get(getPersons);
userRouter.route('/create').post(postNewPerson);

export default userRouter;
