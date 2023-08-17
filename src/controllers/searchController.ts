import { Request, Response } from 'express';
// import { searchPersonsByGeneralSearch } from '../services/searchServives/api/api';
import { searchPersonsByGeneralSearch } from '../services/searchServices/searchPersonByGeneralSearch';

// const { PROD_CORA_API_URL } = process.env;
const PROD_CORA_API_URL = 'https://cora.diva-portal.org/diva/rest/';

// @desc		Get admin search results
// @route		GET /api/search/test/person/:searchQuery
// @access	Private
export const getSearchPersonsByGeneralSearch = async (
  req: Request,
  res: Response,
  error: unknown,
) => {
  const { searchQuery } = req.params;
  const { start, rows } = req.query;

  try {
    const searchParam = await searchPersonsByGeneralSearch(
      `${searchQuery}`,
      Number(start as string),
      Number(rows as string),
    );
    res.status(200).json(searchParam);
  } catch {
    res.status(404).json({ error: `No results for ${searchQuery} found` });
  }
};
