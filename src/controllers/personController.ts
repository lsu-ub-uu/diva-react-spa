import { Request, Response } from 'express';
import { createPersonWithName } from '../services/personServices/createPersonWithName';

// @desc		Get all users
// @route		GET /api/users/
// @access	Public
export const getPersons = async (req: Request, res: Response) => {
  res.status(501).json({ error: 'List users is not implemented' });
};

// @desc		Post new person with name
// @route		Post /api/users/:newPersonWithName
// @access	Public
export const postNewPerson = async (req: Request, res: Response) => {
  const newPerson = req.body;
  const contentType = req.headers['content-type'];
  let authToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    authToken = req.headers.authorization?.split(' ')[1];
  }
  try {
    const createdPerson = await createPersonWithName(newPerson, authToken);
    res.status(201).json(createdPerson);
  } catch (error: any) {
    const errorMessage = error.message;
    const errorCode = Number(errorMessage.match(/\d+/)[0]);
    res.status(errorCode).json(errorMessage);
  }
};
