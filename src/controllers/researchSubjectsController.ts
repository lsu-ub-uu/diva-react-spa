import { Request, Response } from 'express';
import { listResearchSubjects } from '../services/researchSubjectsServices';

// @desc		Get all researchSubjects
// @route		GET /api/publication/
// @access	Public
export const getAllResearchSubjects = async (
  req: Request,
  res: Response,
  error: unknown,
) => {
  try {
    res.status(200).json(listResearchSubjects());
  } catch {
    console.log(error);
    throw new Error(`${error}`);
  }
};
