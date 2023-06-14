import axios from 'axios';
import { vi } from 'vitest';
// import { writeState, deleteState, createInitialState } from '../authSlice';
import personService from '../createPersonService';
import { PersonCreateModel } from '../../../pages/PersonCreatePage';

/**
 * @vitest-environment jsdom
 */
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedCreateOnePerson = vi.mocked('../createPersonService');
// beforeAll(() => {
//   mockedCreateOnePerson.mockResolvedValueOnce()
//   mockHttpClientPost.mockResolvedValueOnce({
//     newCreatedPerson,
//   });
// });
afterEach(() => {
  localStorage.clear();
});
describe('createPersonService', () => {
  // it.only('createPersonService calls the api correctly', async () => {
  //   const userSession = JSON.stringify({
  //     id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  //   });
  //   localStorage.setItem(
  //     'diva_session',
  //     JSON.stringify({
  //       id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  //     }),
  //   );
  //   const getLocalStorage = localStorage.getItem('diva_session');
  //   expect(getLocalStorage).toEqual(userSession);
  //   // const config = {
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //     Authorization: `Bearer aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`,
  //   //   },
  //   // };
  //   const createdUserData: PersonCreateModel = {
  //     authorisedName: {
  //       givenName: 'Egil',
  //       familyName: 'Swenning Leyser',
  //     },
  //   };
  //   mockedAxios.post.mockResolvedValue({
  //     data: {
  //       authorisedName: {
  //         givenName: 'Egil',
  //         familyName: 'Swenning Leyser',
  //       },
  //     },
  //   });
  //   vi.mocked(mockedCreateOnePerson);
  //   await personService.createOnePerson(createdUserData);
  //   expect(mockedAxios).toHaveBeenCalledTimes(1);
  //   // expect(result).toBeCalledWith({
  //   //   url: 'https://cora.epc.ub.uu.se/diva/spaclientbff/api/person/create',
  //   //   headers: config,
  //   //   data: createdUserData,
  //   // });
  //   // expect(mockedCreateOnePerson).toHaveBeenCalled();
  // });
});
