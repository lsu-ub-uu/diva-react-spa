import { Request, Response } from 'express';
import fakePersons from '../__mocks__/fakePersons.json' assert { type: 'json', integrity: 'sha384-ABC123' };

// @desc		Get all users
// @route		GET /api/users/
// @access	Public
export const getUsers = async (req: Request, res: Response) => {
  res.status(200).json(fakePersons);
};
