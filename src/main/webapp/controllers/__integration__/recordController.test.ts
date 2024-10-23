import { startServer } from './utils/startServer';
import { Auth } from '../../types/Auth';
import { loginAsDivaAdmin } from './utils/loginUtil';
import { Server } from 'http';
import supertest from 'supertest';
import { createDivaOutput, deleteDivaOutput } from './utils/dataUtil';
import { createBFFDivaOutput, createExampleDivaOuput } from './utils/testData';

describe('RecordController', () => {
  let server: Server;
  beforeAll(async () => {
    server = await startServer();
  });
  afterAll((done) => {
    server.close(done);
  });

  describe('/api/record/:validationTypeId', () => {
    it('creates a diva-output', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;

      // Act
      const response = await testAgent
        .post('/api/record/diva-output')
        .set('Authtoken', authToken)
        .send(createBFFDivaOutput);

      // Assert
      expect(response.status).toBe(201);

      // Cleanup
      await deleteDivaOutput(response.body.id, authToken);
    });

    it('fails to create a diva-output when body is invalid', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;

      // Act
      const response = await testAgent
        .post('/api/record/diva-output')
        .set('Authtoken', authToken)
        .send({});

      // Assert
      expect(response.status).toBe(400);
    });

    it('fails to create a diva-output when not authenticated', async () => {
      // Arrange
      const testAgent = supertest.agent(server);

      // Act
      const response = await testAgent.post('/api/record/diva-output').send(createBFFDivaOutput);

      // Assert
      expect(response.status).toBe(403);
    });
  });

  describe('/api/record/:validationTypeId/:recordId', () => {
    it('updates a diva-output', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'Egil';
      const { id, updated, tsCreated } = await createDivaOutput(
        createExampleDivaOuput(title),
        authToken
      );

      // Act
      const response = await testAgent
        .post(`/api/record/diva-output/${id}`)
        .set('Authtoken', authToken)
        .send({
          values: {
            output: {
              titleInfo: { _lang: 'alg', title: { value: 'ggggggg' } },
              genre_type_contentType: { value: 'vet', _type: 'contentType' },
              language: {
                languageTerm: [{ value: 'ale', _authority: 'iso639-2b', _type: 'code' }]
              },
              'artistic-work': [{ value: 'artistic-work', _type: 'outputType' }],
              genre_type_outputType: {
                value: 'publication_newspaper-article',
                _type: 'outputType'
              },
              recordInfo: {
                recordContentSource: [{ value: 'hv' }],
                validationType: { value: 'diva-output' },
                dataDivider: { value: 'divaData' },
                id: [{ value: id }],
                type: [{ value: 'diva-output' }],
                createdBy: [{ value: '161616' }],
                tsCreated: [{ value: tsCreated }],
                updated: [
                  {
                    tsUpdated: { value: new Date().toISOString() },
                    updatedBy: { value: '161616' }
                  }
                ]
              }
            }
          }
        });

      // Assert
      expect(response.status).toBe(201);

      // Cleanup
      await deleteDivaOutput(response.body.id, authToken);
    });

    /* it('fails to create a diva-output when body is invalid', async () => {
       // Arrange
       const testAgent = supertest.agent(server);
       const auth: Auth = await loginAsDivaAdmin(testAgent);
       const authToken = auth.data.token;

       // Act
       const response = await testAgent
         .post('/api/record/diva-output')
         .set('Authtoken', authToken)
         .send({});

       // Assert
       expect(response.status).toBe(400);
     });

     it('fails to create a diva-output when not authenticated', async () => {
       // Arrange
       const testAgent = supertest.agent(server);

       // Act
       const response = await testAgent.post('/api/record/diva-output').send(createBFFDivaOutput);

       // Assert
       expect(response.status).toBe(403);
     });*/
  });
});
