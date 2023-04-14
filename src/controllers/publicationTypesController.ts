import { Request, Response } from 'express';
import publicationTypes from '../__mocks__/publicationTypes.json' assert { type: 'json', integrity: 'sha384-ABC123' };

// @desc		Get all publication Types
// @route		GET /api/publicationtypes/
// @access	Public
export const getPublicationTypes = async (req: Request, res: Response) => {
  res.status(200).json(publicationTypes);
};
