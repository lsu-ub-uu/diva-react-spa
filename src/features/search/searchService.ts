import axios from 'axios';
import {
  PersonSearchResult,
  PersonSearchRequest,
} from 'types/personSearchResult';

// const BFF_API_URL = 'https://cora.epc.ub.uu.se/diva/spaclientbff/api';
const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

// Get one recordType
const personSearch = async (
  searchPersonRequest: PersonSearchRequest,
): Promise<PersonSearchResult> => {
  const { start, rows } = searchPersonRequest.paginationRequest;

  const response = await axios.get(
    `${BFF_API_URL}/search/admin/person/${searchPersonRequest.searchTerm}?start=${start}&rows=${rows}`,
  );
  return response.data;
};

const searchService = {
  personSearch,
};

export default searchService;
