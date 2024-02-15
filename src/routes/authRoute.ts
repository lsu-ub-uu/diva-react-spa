import express from 'express';
import { postToGetAuthToken } from '../controllers/authController';

const authRoute = express.Router();

authRoute.route('/:user').post(postToGetAuthToken);

export { authRoute };
