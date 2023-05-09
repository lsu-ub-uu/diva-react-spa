import axios from 'axios';

const BFF_API_URL = 'https://cora.epc.ub.uu.se/diva/spaclientbff/api';

// Get one recordType
const searchPersonsAsAdmin = async (id: string) => {
  const response = await axios.get(`${BFF_API_URL}/search/admin/${id}`);
  return response.data;
};

const searchService = {
  searchPersonsAsAdmin,
};

export default searchService;
