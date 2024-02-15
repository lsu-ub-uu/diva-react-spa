import { Request, Response } from 'express';
import { requestAuthTokenOnLogin } from '../services/authServices/requestAuthTokenOnLogin';

/**
 * @desc Post to get authToken from appToken
 * @route POST /api/auth/:user
 * @access Public
 */
export const postToGetAuthToken = async (req: Request, res: Response) => {
  const { user } = req.params;
  const appToken = req.body.token;

  try {
    const authToken = await requestAuthTokenOnLogin(user, appToken);
    res.status(201).json({ authToken });
  } catch (error: any) {
    const errorMessage = error.message;
    const errorCode = Number(errorMessage.match(/\d+/)[0]);
    res.status(errorCode).json(errorMessage);
  }
};
