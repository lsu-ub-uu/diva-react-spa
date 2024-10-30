import { startServer } from './utils/startServer';
import { Auth } from '../../types/Auth';
import { loginAsDivaAdmin } from './utils/loginUtil';
import { Server } from 'http';
import supertest from 'supertest';
import { createDivaOutput, deleteDivaOutput } from './utils/dataUtil';
import {
  createBFFDivaOutput,
  createBFFUpdatedDivaOutput,
  createExampleDivaOuput
} from './utils/testData';

describe('RecordController', () => {
  let server: Server;
  beforeAll(async () => {
    server = await startServer();
  });
  afterAll((done) => {
    server.close(done);
  });

  /* Create Record */
  describe('POST /api/record/:validationTypeId', () => {
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
      expect(response.status).toBe(401);
    });
  });

  /* Update Record */
  describe('POST /api/record/:validationTypeId/:recordId', () => {
    it('updates a diva-output', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'Egil';
      const createdRecord = await createDivaOutput(createExampleDivaOuput(title), authToken);

      // Act
      const response = await testAgent
        .post(`/api/record/diva-output/${createdRecord.id}`)
        .set('Authtoken', authToken)
        .send(createBFFUpdatedDivaOutput(createdRecord));

      // Assert
      expect(response.status).toBe(200);

      // Cleanup
      await deleteDivaOutput(response.body.id, authToken);
    });

    it('fails to update a diva-output when body is invalid', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'Egil';
      const createdRecord = await createDivaOutput(createExampleDivaOuput(title), authToken);

      // Act
      const response = await testAgent
        .post(`/api/record/diva-output/${createdRecord.id}`)
        .set('Authtoken', authToken)
        .send({});

      // Assert
      expect(response.status).toBe(500);
    });

    it('fails to update a diva-output when not authenticated', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'Egil';
      const createdRecord = await createDivaOutput(createExampleDivaOuput(title), authToken);

      // Act
      const response = await testAgent
        .post(`/api/record/diva-output/${createdRecord.id}`)
        .send(createBFFUpdatedDivaOutput(createdRecord));

      // Assert
      expect(response.status).toBe(401);

      // Cleanup
      await deleteDivaOutput(createdRecord.id, authToken);
    });
  });

  /* Delete Record */
  describe('DELETE /api/record/:validationTypeId/:recordId', () => {
    it('deletes a diva-output', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'Egil';
      const createdRecord = await createDivaOutput(createExampleDivaOuput(title), authToken);

      // Act
      const response = await testAgent
        .delete(`/api/record/diva-output/${createdRecord.id}`)
        .set('Authtoken', authToken);

      // Assert
      expect(response.status).toBe(200);
    });

    it('fails to delete a diva-output when validationType is not found', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'Egil';
      const createdRecord = await createDivaOutput(createExampleDivaOuput(title), authToken);

      // Act
      const response = await testAgent
        .delete(`/api/record/someValidationType/${createdRecord.id}`)
        .set('Authtoken', authToken);

      // Assert
      expect(response.status).toBe(404);

      // Cleanup
      await deleteDivaOutput(createdRecord.id, authToken);
    });

    it('fails to delete a diva-output when not authenticated', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'Egil';
      const createdRecord = await createDivaOutput(createExampleDivaOuput(title), authToken);

      // Act
      const response = await testAgent.delete(`/api/record/diva-output/${createdRecord.id}`);

      // Assert
      expect(response.status).toBe(401);

      // Cleanup
      await deleteDivaOutput(createdRecord.id, authToken);
    });
  });

  /* Get Record */
  describe('GET /api/record/:recordType/:recordId', () => {
    it('gets a specific diva-output', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'someUniqueTitle';
      const createdRecord = await createDivaOutput(createExampleDivaOuput(title), authToken);

      // Act
      const response = await testAgent
        .get(`/api/record/diva-output/${createdRecord.id}`)
        .set('Authtoken', authToken);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.data.output.titleInfo.title.value).toEqual(title);

      // Cleanup
      await deleteDivaOutput(response.body.id, authToken);
    });

    it('fails to get a specific diva-output', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'someUniqueTitle';
      const createdRecord = await createDivaOutput(createExampleDivaOuput(title), authToken);

      // Act
      const response = await testAgent
        .get(`/api/record/diva-output/someWrongId?presentationRecordLinkId=`)
        .set('Authtoken', authToken);

      // Assert
      expect(response.status).toBe(404);

      // Cleanup
      await deleteDivaOutput(createdRecord.id, authToken);
    });

    it('gets a specific diva-output that has a linked presentation', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;
      const title = 'someUniqueTitle';
      const createdRecord = await createDivaOutput(createExampleDivaOuput(title), authToken);

      // Act
      const response = await testAgent
        .get(`/api/record/diva-output/someWrongId`)
        .set('Authtoken', authToken);

      // Assert
      expect(response.status).toBe(404);

      // Cleanup
      await deleteDivaOutput(createdRecord.id, authToken);
    });
  });

  /* Get initial record for validation type */
  describe('GET /api/record/:validationType', () => {
    it('gets an empty record with record info', async () => {
      // Arrange
      const testAgent = supertest.agent(server);
      const auth: Auth = await loginAsDivaAdmin(testAgent);
      const authToken = auth.data.token;

      // Act
      const response = await testAgent.get('/api/record/diva-output/').set('Authtoken', authToken);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.data.output.recordInfo.validationType.value).toEqual('diva-output');
      expect(response.body.data.output.recordInfo.dataDivider.value).toEqual('divaData');
    });
  });
});
