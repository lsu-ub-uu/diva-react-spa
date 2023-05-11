import axios from 'axios';

// const BFF_API_URL = 'https://cora.epc.ub.uu.se/diva/spaclientbff/api';
const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

// Get one recordType
const findOneRecordType = async (id: string) => {
  const response = await axios.get(`${BFF_API_URL}/recordtype/${id}`);
  return response.data;
};

const recordTypeService = {
  findOneRecordType,
};

export default recordTypeService;
