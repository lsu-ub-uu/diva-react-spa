import { Request, Response } from 'express';
import { listSubjectCategories } from '../services/subjectCategoriesServices';

// @desc		Get all researchSubjects
// @route		GET /api/publication/
// @access	Public
export const getAllSubjectCategories = async (
  req: Request,
  res: Response,
  error: unknown,
) => {
  try {
    res.status(200).json(listSubjectCategories());
  } catch {
    console.log(error);
    throw new Error(`${error}`);
  }
};
