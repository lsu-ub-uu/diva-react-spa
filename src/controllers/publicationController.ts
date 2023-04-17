import { Request, Response } from 'express';
import {
  findPublications,
  findSpecificPublication,
} from '../services/publicationServices';

// @desc		Get all publications
// @route		GET /api/publication/
// @access	Public
export const getPublication = async (
  req: Request,
  res: Response,
  error: unknown,
) => {
  try {
    res.status(200).json(findPublications());
  } catch {
    console.log(error);
    throw new Error(`${error}`);
  }
};

// @desc		Get one publication
// @route		GET /api/publication/:id
// @access	Public
export const getSpecificPublication = async (
  req: Request,
  res: Response,
  error: unknown,
) => {
  const publicationId = { id: req.params.id };

  try {
    res.status(200).json(findSpecificPublication(publicationId));
  } catch {
    console.log(error);
    throw new Error(`${error}`);
  }
};
