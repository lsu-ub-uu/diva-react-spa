import { Request, Response } from 'express';

// @desc		Get admin search results
// @route		GET /api/search/test/person/:searchQuery
// @access	Private
export const getSearchPersonsByGeneralSearch = async (
  req: Request,
  res: Response,
  error: unknown,
) => {
  const { searchQuery } = req.params;
  // const { start, rows } = req.query;

  try {
    const searchParam: string[] = [];
    res.status(200).json(searchParam);
  } catch {
    res.status(404).json({ error: `No results for ${searchQuery} found` });
  }
};
