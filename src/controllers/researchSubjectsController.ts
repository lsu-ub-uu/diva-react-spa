import { Request, Response } from 'express';
import researchSubjects from '../__mocks__/researchSubjects.json' assert { type: 'json', integrity: 'sha384-ABC123' };

// @desc		Get all Research Subjects
// @route		GET /api/researchsubjects/
// @access	Public
export const getResearchSubjects = async (req: Request, res: Response) => {
  res.status(200).json(researchSubjects);
};
