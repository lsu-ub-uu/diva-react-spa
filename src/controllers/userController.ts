import { Request, Response } from 'express';
import { findUsers } from '../services/userServices/findUsers';

// @desc		Get all users
// @route		GET /api/users/
// @access	Public
export const getUsers = async (req: Request, res: Response) => {
  res.status(200).json(findUsers());
};
