import { rest } from 'msw';
import publicationTypes from './data/publicationTypes.json';
import subjectCategories from './data/subjectCategories.json';
import fakePersons from './data/fakePersons.json';

const URL = `${window.location.protocol}//${window.location.host}`;

export const handlers = [
  rest.get(`${URL}/fake-persons`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fakePersons));
  }),
  rest.get(`${URL}/publication-types`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(publicationTypes));
  }),
  rest.get(`${URL}/subject-categories`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(subjectCategories));
  }),
  rest.post('/upload-file', (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${URL}/*`, (req) => {
    return req.passthrough();
  }),
];
