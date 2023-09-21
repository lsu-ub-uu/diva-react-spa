import axios from 'axios';
import { vi } from 'vitest';
// import { writeState, deleteState, createInitialState } from '../authSlice';
import personService, { createOnePerson } from '../createPersonService';
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
describe.skip('createPersonService', () => {
  it.only('createPersonService calls the api correctly', async () => {
    localStorage.setItem(
      'diva_session',
      JSON.stringify({
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      }),
    );

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
    mockedAxios.post.mockResolvedValue({
      data: {
        authorisedName: {
          givenName: 'Egil',
          familyName: 'Swenning Leyser',
        },
      },
    });
    // vi.mocked(mockedCreateOnePerson);
    await createOnePerson(createdUserData);
    expect.assertions(2);
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      'https://cora.epc.ub.uu.se/diva/spaclientbff/api/person/create',
      createdUserData,
      config,
    );
  });
});
