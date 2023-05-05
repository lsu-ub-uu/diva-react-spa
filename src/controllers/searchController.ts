import { Request, Response } from 'express';
import axios from 'axios';
import { returnSearchResults } from '../services/searchServives';

// const { PROD_CORA_API_URL } = process.env;
const PROD_CORA_API_URL = 'https://cora.diva-portal.org/diva/rest/';

// @desc		Get admin search results
// @route		GET /api/search/admin/:id
// @access	Private
export const getPublicPersonSearch = async (
  req: Request,
  res: Response,
  error: any,
) => {
  let responseArray: any = [];
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
    responseArray = returnSearchResults(response.data.dataList);
    res.status(200).json(responseArray);
  } catch {
    res.status(404).json({ error: `No results for ${searchQuery} not found` });
  }
};

// @desc		Get public search results
// @route		GET /api/search/public/:id
// @access	Public
export const getPublicSearchData = async (
  req: Request,
  res: Response,
  error: any,
) => {
  const recordType = req.params.name;
  res.status(501).json({ error: 'Public search is not implemented' });
};
