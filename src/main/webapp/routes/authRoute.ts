import express from 'express';
import {
  deleteAuthTokenOnLogout,
  getAllLoginUnits,
  postAppTokenToGetAuthToken,
  postUserNameAndPasswordToGetAuthToken
} from '../controllers/authController';

const authRoute = express.Router();

authRoute.route('/:user').post(postAppTokenToGetAuthToken);
authRoute.route('/:user').delete(deleteAuthTokenOnLogout);
authRoute.route('/loginUnits').get(getAllLoginUnits);
authRoute.route('/password/:user').post(postUserNameAndPasswordToGetAuthToken);

export { authRoute };
