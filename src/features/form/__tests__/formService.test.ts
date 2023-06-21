import axios from 'axios';
import { PersonCreateModel } from 'pages/PersonCreatePage';
import { vi } from 'vitest';
import { createOnePerson } from '../../createPerson/createPersonService';
// import { writeState, deleteState, createInitialState } from '../authSlice';
import { getForm } from '../formService';

/**
 * @vitest-environment jsdom
 */
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedForm = vi.mocked('../formService');
afterEach(() => {
  localStorage.clear();
});
describe('formService', () => {
  // it.each([
  //   'studentThesis',
  //   'project',
  //   'artisticOutput',
  //   'comprehensiveLicentiateThesis',
  //   'conferencePaper',
  //   'contribution',
  //   'comprehensiveDoctoralThesis',
  //   'article',
  //   'other',
  //   'patent',
  //   'monographDoctoralThesis',
  //   'book',
  //   'dissertation',
  //   'conferenceProceedingsEditor',
  //   'monographLicentiateThesis',
  //   'collectionEditor',
  //   'manuscriptPreprint',
  //   'report',
  //   'dataset',
  // ])('formService calls the api correctly for %s', async (validationType) => {
  //   localStorage.setItem(
  //     'diva_session',
  //     JSON.stringify({
  //       id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  //     }),
  //   );

  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`,
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
  //   await getForm(validationType);

  //   expect(mockedAxios.post).toBeCalledWith(
  //     `https://cora.epc.ub.uu.se/diva/spaclientbff/api/publish/${validationType}`,
  //     config,
  //   );
  // });

  it.each([
    'studentThesis',
    'project',
    'artisticOutput',
    'comprehensiveLicentiateThesis',
    'conferencePaper',
    'contribution',
    'comprehensiveDoctoralThesis',
    'article',
    'other',
    'patent',
    'monographDoctoralThesis',
    'book',
    'dissertation',
    'conferenceProceedingsEditor',
    'monographLicentiateThesis',
    'collectionEditor',
    'manuscriptPreprint',
    'report',
    'dataset',
  ])('formService calls the api correctly for %s', async (validationType) => {
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
    mockedAxios.get.mockResolvedValue({
      name: validationType,
    });

    await getForm(validationType);

    expect(mockedAxios.get).toBeCalledWith(
      `https://cora.epc.ub.uu.se/diva/spaclientbff/api/publish/${validationType}`,
      config,
    );
  });
});
