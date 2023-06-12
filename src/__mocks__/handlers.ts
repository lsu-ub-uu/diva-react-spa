import { rest } from 'msw';
import publicationTypes from './data/publicationTypes.json';
import researchSubjects from './data/researchTestTree.json';
import fakePersons from './data/fakePersons.json';
import subjectCategories from './data/subjectCategories.json';

// const URL = `${window.location.protocol}//${window.location.host}`;
const BFF_API_URL = import.meta.env.VITE_BFF_API_URL;

export const handlers = [
  rest.get(`${URL}/fake-persons`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fakePersons));
  }),
  rest.get(`${URL}/publication-types`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(publicationTypes));
  }),
  rest.get(`${URL}/research-subjects`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(researchSubjects));
  }),
  rest.get(`${URL}/subject-categories`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(subjectCategories));
  }),
  rest.get(`${BFF_API_URL}/search/egil`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          givenName: 'Egil',
          familyName: 'Andersson',
          domain: 'uu',
          ORCID_ID: '',
          academicTitle: '',
          id: 'authority-person:14094',
        },
        {
          givenName: 'Egil',
          familyName: 'Henriksen',
          domain: 'uu',
          ORCID_ID: '',
          academicTitle: '',
          id: 'authority-person:13750',
        },
        {
          givenName: 'Egil',
          familyName: 'Asprem',
          domain: 'su',
          ORCID_ID: '0000-0001-9944-1241',
          academicTitle: 'Professor',
          id: 'authority-person:84704',
        },
        {
          givenName: 'Daniel Egil',
          familyName: 'Yencken',
          domain: 'su',
          ORCID_ID: '0000-0002-5282-6424',
          academicTitle: '',
          id: 'authority-person:95060',
        },
      ]),
    );
  }),
  rest.get(`${BFF_API_URL}/auth/coraUser:111111111111111`, (req, res, ctx) => {
    return res(
      ctx.set({
        'Content-Type': 'application/json',
      }),
      ctx.body(
        JSON.stringify({ token: '89ad2b42-785a-4421-a647-f959cdb85f4a' }),
      ),
      ctx.status(200),
      ctx.json([
        {
          authToken: {
            id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            validForNoSeconds: '600',
            idInUserStorage: 'coraUser:491201365536105',
            idFromLogin: 'coraUser:491201365536105',
            lastName: 'KTH',
            firstName: 'domainAdmin',
          },
        },
      ]),
    );
  }),
  rest.post('/upload-file', (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // rest.get(`${URL}/*`, (req) => {
  //   return req.passthrough();
  // }),
  // rest.get(`${BFF_API_URL}/*`, (req) => {
  //   return req.passthrough();
  // }),
  // rest.get(`http://localhost:8081/api/*`, (req) => {
  //   return req.passthrough();
  // }),
];
