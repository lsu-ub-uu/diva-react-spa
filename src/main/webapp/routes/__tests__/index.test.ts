/*
 * Copyright 2024 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */


describe('API endpoint routes', () => {
  it('should', () => {});
  // afterAll(() => {});
  //
  // describe('/', () => {
  //   it('GET / returns a 200', async () => {
  //     const response = await request(app).get('/');
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toStrictEqual('');
  //   });
  // });
  // describe('/api/translations/', () => {
  //   it('GET /api/translations/sv returns a 200', async () => {
  //     const refresh = await request(app).get('/api/refreshDefinitions');
  //     expect(refresh.statusCode).toBe(200);
  //     const response = await request(app).get('/api/translations/sv');
  //     expect(response.statusCode).toBe(200);
  //     expect(Object.keys(response.body).length).toBeGreaterThanOrEqual(1);
  //     // expect(response.body).toStrictEqual({ test: 'test' });
  //   }, 100000);
  // });
  // describe('/api/record', () => {
  //   it('GET /api/record/person/person:8016283357279641 returns a 200', async () => {
  //     const refresh = await request(app).get('/api/refreshDefinitions');
  //     expect(refresh.statusCode).toBe(200);
  //     const response = await request(app).get(
  //       '/api/record/person/person:8016283357279641?presentationRecordLinkId=divaPersonOutputPLink'
  //     );
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toStrictEqual({
  //       createdAt: '2021-02-12T10:55:49.032650Z',
  //       data: {
  //         person: {
  //           Libris_ID: [
  //             {
  //               value: '123456'
  //             }
  //           ],
  //           ORCID_ID: [
  //             {
  //               value: '1111-2222-3333-4444'
  //             }
  //           ],
  //           VIAF_ID: [
  //             {
  //               value: '123456'
  //             }
  //           ],
  //           academicTitle: [
  //             {
  //               value: 'Akademisk titel'
  //             }
  //           ],
  //           alternativeName: [
  //             {
  //               familyName: [
  //                 {
  //                   value: 'Alternativt efternamn'
  //                 }
  //               ],
  //               givenName: [
  //                 {
  //                   value: 'Alternativt förnamn'
  //                 }
  //               ]
  //             }
  //           ],
  //           authorisedName: {
  //             familyName: [
  //               {
  //                 value: 'Efternamn'
  //               }
  //             ],
  //             givenName: [
  //               {
  //                 value: 'Förnamn'
  //               }
  //             ]
  //           },
  //           biographyEnglish: [
  //             {
  //               biography: {
  //                 value: 'Biografi på engelska.'
  //               },
  //               language: {
  //                 value: 'en'
  //               }
  //             }
  //           ],
  //           biographySwedish: [
  //             {
  //               biography: {
  //                 value: 'Biografi på svenska.'
  //               },
  //               language: {
  //                 value: 'sv'
  //               }
  //             }
  //           ],
  //           externalURL: [
  //             {
  //               URL: {
  //                 value: 'http://xx.se'
  //               },
  //               linkTitle: {
  //                 value: 'Länktext'
  //               }
  //             }
  //           ],
  //           otherAffiliation: [
  //             {
  //               affiliation: {
  //                 value: 'Annan organisation'
  //               },
  //               affiliationFromYear: [
  //                 {
  //                   value: '1980'
  //                 }
  //               ],
  //               affiliationUntilYear: [
  //                 {
  //                   value: '1990'
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       },
  //       id: 'person:8016283357279641',
  //       recordType: 'person',
  //       updated: [],
  //       userRights: ['read', 'read_incoming_links'],
  //       validationType: 'person',
  //       presentation: {
  //         form: {
  //           childStyle: [''],
  //           components: [
  //             {
  //               childStyle: ['compact'],
  //               components: [
  //                 {
  //                   childStyle: [''],
  //                   gridColSpan: 12,
  //                   inputType: 'input',
  //                   label: 'lastNameTextVarText',
  //                   mode: 'output',
  //                   name: 'familyName',
  //                   repeat: {
  //                     minNumberOfRepeatingToShow: 1,
  //                     repeatMax: 1,
  //                     repeatMin: 0
  //                   },
  //                   showLabel: true,
  //                   tooltip: {
  //                     body: 'lastNameTextVarDefText',
  //                     title: 'lastNameTextVarText'
  //                   },
  //                   type: 'textVariable',
  //                   validation: {
  //                     pattern: '.+',
  //                     type: 'regex'
  //                   }
  //                 },
  //                 {
  //                   childStyle: [''],
  //                   components: [
  //                     {
  //                       childStyle: [''],
  //                       gridColSpan: 12,
  //                       name: 'commaText',
  //                       type: 'text'
  //                     },
  //                     {
  //                       childStyle: [''],
  //                       gridColSpan: 12,
  //                       name: 'spaceText',
  //                       type: 'text'
  //                     },
  //                     {
  //                       childStyle: [''],
  //                       gridColSpan: 12,
  //                       inputType: 'input',
  //                       label: 'firstNameTextVarText',
  //                       mode: 'output',
  //                       name: 'givenName',
  //                       repeat: {
  //                         minNumberOfRepeatingToShow: 1,
  //                         repeatMax: 1,
  //                         repeatMin: 0
  //                       },
  //                       showLabel: true,
  //                       tooltip: {
  //                         body: 'firstNameTextVarDefText',
  //                         title: 'firstNameTextVarText'
  //                       },
  //                       type: 'textVariable',
  //                       validation: {
  //                         pattern: '.+',
  //                         type: 'regex'
  //                       }
  //                     }
  //                   ],
  //                   containerType: 'surrounding',
  //                   gridColSpan: 12,
  //                   mode: 'output',
  //                   name: 'personNameLinkSContainer',
  //                   presentationStyle: 'inline',
  //                   type: 'container'
  //                 }
  //               ],
  //               gridColSpan: 12,
  //               label: 'personNameGroupText',
  //               mode: 'output',
  //               name: 'authorisedName',
  //               presentationStyle: '',
  //               repeat: {
  //                 minNumberOfRepeatingToShow: 1,
  //                 repeatMax: 1,
  //                 repeatMin: 1
  //               },
  //               showLabel: false,
  //               tooltip: {
  //                 body: 'personNameGroupDefText',
  //                 title: 'personNameGroupText'
  //               },
  //               type: 'group'
  //             }
  //           ],
  //           gridColSpan: 12,
  //           label: 'personGroupText',
  //           mode: 'output',
  //           name: 'person',
  //           presentationStyle: 'inline',
  //           repeat: {
  //             repeatMax: 1,
  //             repeatMin: 1
  //           },
  //           showLabel: false,
  //           tooltip: {
  //             body: 'personGroupDefText',
  //             title: 'personGroupText'
  //           },
  //           type: 'group'
  //         }
  //       }
  //     });
  //   }, 100000);
  // });
  // describe('/api/refreshDefinitions', () => {
  //   it('GET /api/refreshDefinitions returns a 200', async () => {
  //     const response = await request(app).get('/api/refreshDefinitions');
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toStrictEqual({
  //       message: 'Refreshed cora defs'
  //     });
  //   }, 100000);
  // });
});
