import express from 'express';
import { getAllLoginUnits, postAppTokenToGetAuthToken } from '../controllers/authController';

const authRoute = express.Router();

authRoute.route('/:user').post(postAppTokenToGetAuthToken);
authRoute.route('/loginUnits').get(getAllLoginUnits);

export { authRoute };
