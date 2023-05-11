import { Request, Response } from 'express';

// @desc		Get all users
// @route		GET /api/users/
// @access	Public
export const getUsers = async (req: Request, res: Response) => {
  res.status(501).json({ error: 'List users is not implemented' });
};
