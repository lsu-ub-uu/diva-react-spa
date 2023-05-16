import { Request, Response } from 'express';
import axios from 'axios';
import { returnSearchPersonResults } from '../services/searchServives';
import { searchPersonsByGeneralSearch } from '../services/searchServives/api/api';

// const { PROD_CORA_API_URL } = process.env;
const PROD_CORA_API_URL = 'https://cora.diva-portal.org/diva/rest/';

// @desc		Get admin search results
// @route		GET /api/search/admin/person/:searchQuery
// @access	Private
export const getAdminPersonSearch = async (
  req: Request,
  res: Response,
  error: any,
) => {
  let responseArray: any;
  const { searchQuery } = req.params;
  try {
    console.log(
      'SEARCH:',
      `${PROD_CORA_API_URL}/record/searchResult/publicPersonSearch?searchData={"name":"search","children":[{"name":"include","children":[{"name":"includePart","children":[{"name":"personGeneralSearchTerm","value":"${searchQuery}"}]}]}]}`,
    );

    const config = {
      headers: {
        Accept: 'application/vnd.uub.recordList+json',
      },
    };
    const response = await axios.get(
      `${PROD_CORA_API_URL}/record/searchResult/publicPersonSearch?searchData={"name":"search","children":[{"name":"include","children":[{"name":"includePart","children":[{"name":"personGeneralSearchTerm","value":"${searchQuery}"}]}]}]}`,
      config,
    );
    responseArray = response.data.dataList;

    res.status(200).json(await returnSearchPersonResults(responseArray));
  } catch {
    res.status(404).json({ error: `No results for ${searchQuery} not found` });
  }
};

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
