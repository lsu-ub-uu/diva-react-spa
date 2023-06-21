import axios from 'axios';

// const BFF_API_URL = 'https://cora.epc.ub.uu.se/diva/spaclientbff/api';
const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

// Get one recordType
export const getForm = async (validationType: string) => {
  const idInLocalStorageObj = JSON.parse(
    localStorage.getItem('diva_session') as string,
  );
  const { id } = idInLocalStorageObj;
  // console.log('id', id);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${id}`,
    },
  };

  const response = await axios.get(`${BFF_API_URL}/publish/${validationType}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${id}`,
    },
  });

  console.log('res', response);
  return response.data;
};

const personService = {
  getForm,
};

export default personService;
