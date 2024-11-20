import express from 'express';
import { getAllLoginUnits } from '../controllers/authController';

const authRoute = express.Router();

authRoute.route('/loginUnits').get(getAllLoginUnits);

export { authRoute };
