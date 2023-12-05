import { Request, Response } from 'express';
import { findFormInCora, findNewFormInCora } from '../services/publishServices/findFormInCora';

// @desc		Get new person with name
// @route		GET /api/publish/:validationType
// @access	Private
export const getPublicationForm = async (req: Request, res: Response) => {
  const { validationType } = req.params;

  let authToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    authToken = req.headers.authorization?.split(' ')[1];
  }

  try {
    const createdPerson = await findFormInCora(validationType, authToken);
    res.status(201).json(createdPerson);
  } catch (error: any) {
    const errorMessage = error.message;
    const errorCode = Number(errorMessage.match(/\d+/)[0]);
    res.status(errorCode).json(errorMessage);
  }
};

// @desc		Get new person with name
// @route		GET /api/publish/:validationType/new
// @access	Private
export const getNewPublicationForm = async (req: Request, res: Response) => {
  const { validationType } = req.params;

  let authToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    authToken = req.headers.authorization?.split(' ')[1];
  }

  try {
    const createdPerson = await findNewFormInCora(validationType, authToken);
    res.status(201).json(createdPerson);
  } catch (error: any) {
    const errorMessage = error.message;
    const errorCode = Number(errorMessage.match(/\d+/)[0]);
    res.status(errorCode).json(errorMessage);
  }
};
