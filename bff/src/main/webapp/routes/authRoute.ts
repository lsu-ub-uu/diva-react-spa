import express from 'express';
import {
  deleteAuthTokenOnLogout,
  getAllLoginUnits,
  postAppTokenToGetAuthToken,
  postUserNameAndPasswordToGetAuthToken
} from '../controllers/authController';

const authRoute = express.Router();

authRoute.route('/appToken').post(postAppTokenToGetAuthToken);
authRoute.route('/').delete(deleteAuthTokenOnLogout);
authRoute.route('/loginUnits').get(getAllLoginUnits);
authRoute.route('/password').post(postUserNameAndPasswordToGetAuthToken);

export { authRoute };
