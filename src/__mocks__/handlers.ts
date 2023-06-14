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
  rest.get(`${BFF_API_URL}/person/create`, (req, res, ctx) => {
    return res(
      ctx.set({
        'Content-Type': 'application/json',
        Authorization: `Bearer aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`,
      }),
      ctx.body(
        JSON.stringify({
          authorisedName: {
            familyName: 'Swenning Leyser',
            givenName: 'Egil',
          },
        }),
      ),
      ctx.status(201),
      ctx.json([
        {
          record: {
            data: {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'system',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'diva',
                        },
                      ],
                      actionLinks: {
                        read: {
                          requestMethod: 'GET',
                          rel: 'read',
                          url: 'https://cora.epc.ub.uu.se/diva/rest/record/system/diva',
                          accept: 'application/vnd.uub.record+json',
                        },
                      },
                      name: 'dataDivider',
                    },
                    {
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'validationType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'person',
                        },
                      ],
                      actionLinks: {
                        read: {
                          requestMethod: 'GET',
                          rel: 'read',
                          url: 'https://cora.epc.ub.uu.se/diva/rest/record/validationType/person',
                          accept: 'application/vnd.uub.record+json',
                        },
                      },
                      name: 'validationType',
                    },
                    {
                      name: 'id',
                      value: 'person:4593103303210736',
                    },
                    {
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'person',
                        },
                      ],
                      actionLinks: {
                        read: {
                          requestMethod: 'GET',
                          rel: 'read',
                          url: 'https://cora.epc.ub.uu.se/diva/rest/record/recordType/person',
                          accept: 'application/vnd.uub.record+json',
                        },
                      },
                      name: 'type',
                    },
                    {
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'user',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'coraUser:490742519075086',
                        },
                      ],
                      actionLinks: {
                        read: {
                          requestMethod: 'GET',
                          rel: 'read',
                          url: 'https://cora.epc.ub.uu.se/diva/rest/record/user/coraUser:490742519075086',
                          accept: 'application/vnd.uub.record+json',
                        },
                      },
                      name: 'createdBy',
                    },
                    {
                      name: 'tsCreated',
                      value: '2023-06-13T12:53:40.128404Z',
                    },
                    {
                      repeatId: '0',
                      children: [
                        {
                          children: [
                            {
                              name: 'linkedRecordType',
                              value: 'user',
                            },
                            {
                              name: 'linkedRecordId',
                              value: 'coraUser:490742519075086',
                            },
                          ],
                          actionLinks: {
                            read: {
                              requestMethod: 'GET',
                              rel: 'read',
                              url: 'https://cora.epc.ub.uu.se/diva/rest/record/user/coraUser:490742519075086',
                              accept: 'application/vnd.uub.record+json',
                            },
                          },
                          name: 'updatedBy',
                        },
                        {
                          name: 'tsUpdated',
                          value: '2023-06-13T12:53:40.128404Z',
                        },
                      ],
                      name: 'updated',
                    },
                  ],
                  name: 'recordInfo',
                },
                {
                  children: [
                    {
                      name: 'givenName',
                      value: 'Egil',
                    },
                    {
                      name: 'familyName',
                      value: 'Swenning Leyser',
                    },
                  ],
                  name: 'authorisedName',
                },
              ],
              name: 'person',
            },
            permissions: {
              read: [
                'externalURL',
                'otherAffiliation',
                'biographySwedish',
                'biographyEnglish',
                'ORCID_ID',
                'type',
                'dataDivider',
                'academicTitle',
                'yearOfDeath',
                'emailAddress',
                'personDomainPart',
                'public',
                'createdBy',
                'domain',
                'Libris_ID',
                'tsCreated',
                'id',
                'alternativeName',
                'VIAF_ID',
                'updated',
                'yearOfBirth',
              ],
              write: [
                'externalURL',
                'otherAffiliation',
                'biographySwedish',
                'biographyEnglish',
                'ORCID_ID',
                'type',
                'dataDivider',
                'academicTitle',
                'yearOfDeath',
                'emailAddress',
                'public',
                'createdBy',
                'Libris_ID',
                'tsCreated',
                'id',
                'alternativeName',
                'VIAF_ID',
                'updated',
                'yearOfBirth',
              ],
            },
            actionLinks: {
              read: {
                requestMethod: 'GET',
                rel: 'read',
                url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/person:4593103303210736',
                accept: 'application/vnd.uub.record+json',
              },
              update: {
                requestMethod: 'POST',
                rel: 'update',
                contentType: 'application/vnd.uub.record+json',
                url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/person:4593103303210736',
                accept: 'application/vnd.uub.record+json',
              },
              index: {
                requestMethod: 'POST',
                rel: 'index',
                body: {
                  children: [
                    {
                      children: [
                        {
                          name: 'linkedRecordType',
                          value: 'recordType',
                        },
                        {
                          name: 'linkedRecordId',
                          value: 'person',
                        },
                      ],
                      name: 'recordType',
                    },
                    {
                      name: 'recordId',
                      value: 'person:4593103303210736',
                    },
                    {
                      name: 'type',
                      value: 'index',
                    },
                  ],
                  name: 'workOrder',
                },
                contentType: 'application/vnd.uub.record+json',
                url: 'https://cora.epc.ub.uu.se/diva/rest/record/workOrder/',
                accept: 'application/vnd.uub.record+json',
              },
              delete: {
                requestMethod: 'DELETE',
                rel: 'delete',
                url: 'https://cora.epc.ub.uu.se/diva/rest/record/person/person:4593103303210736',
              },
            },
          },
        },
      ]),
    );
  }),
  rest.post('/upload-file', (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${URL}/*`, (req) => {
    return req.passthrough();
  }),
  rest.post(`${URL}/*`, (req) => {
    return req.passthrough();
  }),
  // rest.get(`${BFF_API_URL}/*`, (req) => {
  //   return req.passthrough();
  // }),
  // rest.get(`http://localhost:8081/api/*`, (req) => {
  //   return req.passthrough();
  // }),
];
