import { Request, Response } from 'express';
import * as console from 'console';
import { deleteAuthTokenFromCora, requestAuthTokenOnLogin } from '../cora/auth';
import { errorHandler } from '../server';
import { createLoginDefinition } from '../loginDefinition/loginDefinition';
import { dependencies } from '../config/configureServer';

/**
 * @desc Post appToken to get authToken
 * @route POST /api/auth/:user
 * @access Public
 */
export const postAppTokenToGetAuthToken = async (req: Request, res: Response) => {
  const { user } = req.params;
  const appToken = req.body.token;
  try {
    const authToken = await requestAuthTokenOnLogin(user, appToken, 'apptoken');
    res.status(201).json({ authToken });
  } catch (error: unknown) {
    console.log(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

/**
 * @desc Delete appToken to get authToken
 * @route DELETE /api/auth/:user
 * @access Private
 */
export const deleteAuthTokenOnLogout = async (req: Request, res: Response) => {
  const { user } = req.params;
  const authToken = req.header('authToken') ?? '';
  try {
    const response = await deleteAuthTokenFromCora(user, authToken);
    res.status(response.status).json(response.status);
  } catch (error: unknown) {
    console.log(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

/**
 * @desc Get loginUnits from Cora
 * @route GET /api/auth/loginUnits
 * @access Public
 */
export const getAllLoginUnits = async (req: Request, res: Response) => {
  try {
    const loginList = createLoginDefinition(dependencies);
    res.status(200).json(loginList);
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

/**
 * @desc Post userName and password to get authToken
 * @route POST /api/auth/password/:user
 * @access Public
 */
export const postUserNameAndPasswordToGetAuthToken = async (req: Request, res: Response) => {
  const { user } = req.params;
  const { password } = req.body;
  try {
    // const authToken = await requestAuthTokenOnLogin(user, password, 'password');
    // res.status(201).json({ authToken });
    const authToken = {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      validForNoSeconds: '600',
      idInUserStorage: 'coraUser:111111111111111',
      idFromLogin: 'coraUser:111111111111111',
      lastName: 'Temp',
      firstName: 'user'
    };
    res.status(201).json({ authToken });
  } catch (error: unknown) {
    console.log(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};
