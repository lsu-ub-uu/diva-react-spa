import { Request, Response } from 'express';
import {
  listResearchSubjects,
  listResearchSubjectsAsTree
} from '../services/researchSubjectsServices';

// @desc		Get all researchSubjects
// @route		GET /api/publication/
// @access	Public
export const getAllResearchSubjects = async (req: Request, res: Response, error: unknown) => {
  const { tree } = req.query;
  if (tree === 'true') {
    res.status(200).json(listResearchSubjectsAsTree());
  } else {
    try {
      res.status(200).json(listResearchSubjects());
    } catch {
      console.log(error);
      throw new Error(`${error}`);
    }
  }
};
