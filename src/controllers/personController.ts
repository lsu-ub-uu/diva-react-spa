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
  // console.log(req.body);
  try {
    const createdPerson = await createPersonWithName(newPerson);
    res.status(200).json(createdPerson);
  } catch {
    res.status(500).json({ error: `No post created` });
  }
};
