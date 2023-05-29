import express from 'express';
import { getAuthToken } from '../controllers/authController';

const searchRoute = express.Router();

searchRoute.route('/:user').post(getAuthToken);

export default searchRoute;
