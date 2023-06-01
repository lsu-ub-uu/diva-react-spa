import { Request, Response } from 'express';
import { requestAuthTokenOnLogin } from '../services/authServices/requestAuthTokenOnLogin';

// @desc		Post authToken
// @route		POST /api/auth/:user
// @access	Public
export const getAuthToken = async (req: Request, res: Response) => {
  const { user } = req.params;
  const { APP_TOKEN_ADMIN } = process.env;

  try {
    const authToken = await requestAuthTokenOnLogin(user, APP_TOKEN_ADMIN);

    res.status(201).json({ authToken });
  } catch (error: any) {
    const errorMessage = error.message;
    const errorCode = Number(errorMessage.match(/\d+/)[0]);
    res.status(errorCode).json(errorMessage);
  }
};
