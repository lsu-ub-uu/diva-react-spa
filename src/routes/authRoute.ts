import express from 'express';
import { postAppTokenToGetAuthToken } from '../controllers/authController';

const authRoute = express.Router();

authRoute.route('/:user').post(postAppTokenToGetAuthToken);

export { authRoute };
