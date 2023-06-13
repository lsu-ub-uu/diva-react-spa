import axios from 'axios';
import { vi } from 'vitest';
// import { writeState, deleteState, createInitialState } from '../authSlice';
import personService from '../createPersonService';
import { PersonCreateModel } from '../../../pages/PersonCreatePage';

/**
 * @vitest-environment jsdom
 */
vi.mock('axios');
afterEach(() => {
  localStorage.clear();
});
describe('createPersonService', () => {
  it('writeState writes to localStorage', async () => {
    const userSession = JSON.stringify({
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    });
    localStorage.setItem(
      'diva_session',
      JSON.stringify({
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      }),
    );

    const getLocalStorage = localStorage.getItem('diva_session');
    expect(getLocalStorage).toEqual(userSession);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`,
      },
    };
    const createdUserData: PersonCreateModel = {
      authorisedName: {
        givenName: 'Egil',
        familyName: 'Swenning Leyser',
      },
    };

    axios.post.mockResolvedValue({
      data: createdUserData,
    });

    personService.createOnePerson(createdUserData);

    // expect(personService.createOnePerson).toBeCalledWith({
    //   url: 'https://cora.epc.ub.uu.se/diva/spaclientbff/api/person/create',
    //   headers: config,
    //   data: createdUserData,
    // });
    // expect(axios).toBeCalledWith({
    //   url: 'https://cora.epc.ub.uu.se/diva/spaclientbff/api/person/create',
    //   headers: config,
    //   data: createdUserData,
    // });
  });
});

// const idInLocalStorageObj = JSON.parse(
//     localStorage.getItem('diva_session') as string,
//   );
//   const { id } = idInLocalStorageObj;
//   console.log('id', id);

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer 064e5560-baab-40fa-a055-c2f7936e3686`,
//     },
//   };
//   const response = await axios.post(
//     `${BFF_API_URL}/person/create`,
//     person,
//     config,
//   );
//   return response.data;
// };
