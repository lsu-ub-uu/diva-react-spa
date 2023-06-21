import { Request, Response } from 'express';
import { addNewPublication } from '../services/publishServices/addNewPublication';

// @desc		Post new person with name
// @route		Post /api/users/:newPersonWithName
// @access	Public
export const postPublication = async (req: Request, res: Response) => {
  const { validationType } = req.params;

  let authToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    authToken = req.headers.authorization?.split(' ')[1];
  }

  try {
    const createdPerson = await addNewPublication(validationType, authToken);
    res.status(201).json(createdPerson);
  } catch (error: any) {
    const errorMessage = error.message;
    const errorCode = Number(errorMessage.match(/\d+/)[0]);
    res.status(errorCode).json(errorMessage);
  }
};
