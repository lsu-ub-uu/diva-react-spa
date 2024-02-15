import express, { Application } from 'express';
import axios from 'axios';
import { configureServer, dependencies, loadStuffOnServerStart } from './config/configureServer';
import { createTextDefinition } from './textDefinition/textDefinition';

import {
  getRecordDataById,
  getSearchResultDataListBySearchType,
  postRecordData,
  updateRecordDataById
} from './cora/cora';
import { DataGroup, DataListWrapper, RecordWrapper } from './utils/cora-data/CoraData';

import { transformCoraValidationTypes } from './config/transformValidationTypes';

import {
  createFormDefinition,
  createLinkedRecordDefinition
} from './formDefinition/formDefinition';
import authRoute from './routes/authRoute';
import { extractIdFromRecordInfo } from './utils/cora-data/CoraDataTransforms';
import { injectRecordInfoIntoDataGroup, transformToCoraData } from './config/transformToCora';
import { cleanJson } from './utils/structs/removeEmpty';
import { transformRecord, transformRecords } from './config/transformRecord';

import { createFormMetaDataPathLookup } from './utils/structs/metadataPathLookup';
import { createFormMetaData } from './formDefinition/formMetadata';
import translationRoute from './routes/translationRoute';
import divaOutputsRoute from './routes/divaOutputsRoute';
import validationTypesRoute from './routes/validationTypesRoute';
import recordRoute from './routes/recordRoute';

const PORT = process.env.PORT || 8080;
const { CORA_API_URL } = process.env;

axios.defaults.baseURL = CORA_API_URL;

const app: Application = express();

configureServer(app);

export const errorHandler = (error: unknown) => {
  // @ts-ignore
  const message: string = (error.message ?? 'Unknown error') as string;
  const status = axios.isAxiosError(error) ? error.response?.status : 500;
  return {
    message,
    status: status ?? 500
  };
};

app.use('/api/auth', authRoute);
app.use('/api/translations/', translationRoute);
app.use('/api/divaOutputs', divaOutputsRoute);
app.use('/api/validationTypes', validationTypesRoute);
app.use('/api/record', recordRoute);

// app.post('/api/record/:validationTypeId/:recordId', async (req, res) => {
//   try {
//     const { validationTypeId, recordId } = req.params;
//     const authToken = req.header('authToken') ?? '';
//
//     const payload = cleanJson(req.body);
//     const { lastUpdate, values } = payload;
//     const recordType = Object.keys(values)[0];
//
//     const { validationTypePool } = dependencies;
//
//     if (!validationTypePool.has(validationTypeId)) {
//       throw new Error(`Validation type [${validationTypeId}] does not exist`);
//     }
//
//     const FORM_MODE_UPDATE = 'update';
//     const dataDivider = 'diva';
//
//     const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_UPDATE);
//     const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
//     const transformData = transformToCoraData(formMetaDataPathLookup, values);
//     const updateGroup = injectRecordInfoIntoDataGroup(
//       transformData[0] as DataGroup,
//       validationTypeId,
//       dataDivider,
//       recordId,
//       recordType,
//       lastUpdate.updatedBy,
//       lastUpdate.updateAt
//     );
//
//     const response = await updateRecordDataById<RecordWrapper>(
//       recordId,
//       updateGroup,
//       recordType,
//       authToken
//     );
//
//     res.status(response.status).json({});
//   } catch (error: unknown) {
//     const errorResponse = errorHandler(error);
//     res.status(errorResponse.status).json(errorResponse).send();
//   }
// });

// app.post('/api/record/:validationTypeId', async (req, res) => {
//   try {
//     const { validationTypeId } = req.params;
//     const authToken = req.header('authToken') ?? '';
//
//     const payload = cleanJson(req.body);
//     const recordType = Object.keys(payload)[0];
//
//     const { validationTypePool } = dependencies;
//
//     if (!validationTypePool.has(validationTypeId)) {
//       throw new Error(`Validation type [${validationTypeId}] does not exist`);
//     }
//
//     const FORM_MODE_NEW = 'create';
//     const dataDivider = 'diva';
//
//     const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
//     const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
//     const transformData = transformToCoraData(formMetaDataPathLookup, payload);
//     const newGroup = injectRecordInfoIntoDataGroup(
//       transformData[0] as DataGroup,
//       validationTypeId,
//       dataDivider
//     );
//     const response = await postRecordData<RecordWrapper>(newGroup, recordType, authToken);
//     const id = extractIdFromRecordInfo(response.data.record.data);
//
//     res.status(response.status).json({ id }); // return id for now
//   } catch (error: unknown) {
//     const errorResponse = errorHandler(error);
//     res.status(errorResponse.status).json(errorResponse).send();
//   }
// });

// app.get('/api/record/:recordType/:recordId', async (req, res) => {
//   try {
//     const { recordType, recordId } = req.params;
//     const authToken = req.header('authToken') ?? '';
//
//     const response = await getRecordDataById<RecordWrapper>(recordType, recordId, authToken);
//     const recordWrapper = response.data;
//     const record = transformRecord(dependencies, recordWrapper);
//     res.status(response.status).json(record);
//   } catch (error: unknown) {
//     const errorResponse = errorHandler(error);
//     res.status(errorResponse.status).json(errorResponse).send();
//   }
// });

app.use('/api/form/:validationTypeId/:mode', async (req, res) => {
  try {
    const { validationTypeId, mode } = req.params;

    if (!['create', 'update', 'view'].includes(mode)) {
      throw new Error(`Mode [${mode}] is not supported`);
    }

    if (!dependencies.validationTypePool.has(validationTypeId)) {
      throw new Error(`Validation type [${validationTypeId}] does not exist`);
    }

    const formDef = createFormDefinition(
      dependencies,
      validationTypeId,
      mode as 'create' | 'update' | 'view'
    );

    res.status(200).json(formDef);
  } catch (error: unknown) {
    console.log(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
});

app.get('/api/refreshDefinitions', async (_req, res) => {
  try {
    await loadStuffOnServerStart();
    res.status(200).json({ message: 'Refreshed cora defs' });
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
});

app.listen(PORT, (): void => {
  console.log(`Server running at ${PORT}`);
  console.log(`Cora API-url ${CORA_API_URL}`);
  // loadStuffOnServerStart().then(() => {
  //   console.log('Loaded stuff from cora');
  //   const definition = createLinkedRecordDefinition(dependencies, 'divaPersonOutputPLink');
  //   console.log(JSON.stringify(definition, null, 1));
  // });
});
