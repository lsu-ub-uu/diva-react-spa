import express from 'express';
import {
  deleteAuthTokenOnLogout,
  getAllLoginUnits,
  postAppTokenToGetAuthToken
} from '../controllers/authController';

const authRoute = express.Router();

authRoute.route('/:user').post(postAppTokenToGetAuthToken);
authRoute.route('/:user').delete(deleteAuthTokenOnLogout);
authRoute.route('/loginUnits').get(getAllLoginUnits);

export { authRoute };
