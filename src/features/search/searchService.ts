import axios from 'axios';

// const BFF_API_URL = 'https://cora.epc.ub.uu.se/diva/spaclientbff/api';
const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

// Get one recordType
const searchPersonsAsAdmin = async (id: string) => {
  const response = await axios.get(`${BFF_API_URL}/search/admin/person/${id}`);
  return response.data;
};

const searchService = {
  searchPersonsAsAdmin,
};

export default searchService;
