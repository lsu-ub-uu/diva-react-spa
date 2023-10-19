import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { PersonCreateModel } from '../../pages/PersonCreatePage';

const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

// Get one recordType
export const createOnePerson = async (person: PersonCreateModel) => {
  const idInLocalStorageObj = JSON.parse(
    localStorage.getItem('diva_session') as string,
  );
  const { id } = idInLocalStorageObj;
  console.log('id', id);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${id}`,
    },
  };
  const response = await axios.post(
    `${BFF_API_URL}/person/create`,
    person,
    config,
  );
  console.log('res', response.data);
  return response.data;
};

const personService = {
  createOnePerson,
};

export default personService;
