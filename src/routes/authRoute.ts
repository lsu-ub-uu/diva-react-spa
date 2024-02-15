import express from 'express';
import { getAuthToken } from '../controllers/authController';

const authRoute = express.Router();

authRoute.route('/:user').post(getAuthToken);

export { authRoute };
