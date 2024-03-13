import { Request, Response } from 'express';
import { requestAuthTokenOnLogin } from '../cora/auth';
import { errorHandler } from '../server';

/**
 * @desc Post appToken to get authToken
 * @route POST /api/auth/:user
 * @access Public
 */
export const postAppTokenToGetAuthToken = async (req: Request, res: Response) => {
  const { user } = req.params;
  const appToken = req.body.token;

  try {
    const authToken = await requestAuthTokenOnLogin(user, appToken);
    res.status(201).json({ authToken });
  } catch (error: unknown) {
    console.log(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};
