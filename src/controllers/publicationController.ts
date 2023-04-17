import { Request, Response } from 'express';
import {
  findPublications,
  findSpecificPublication,
} from '../services/publicationServices';

// @desc		Get all publications
// @route		GET /api/publication/
// @access	Public
export const getPublication = async (req: Request, res: Response) => {
  res.status(200).json(findPublications());
};

// @desc		Get one publication
// @route		GET /api/publication/:id
// @access	Public
export const getSpecificPublication = async (req: Request, res: Response) => {
  const publicationId = req.params.id;
  res.status(200).json(findSpecificPublication(publicationId));
};
