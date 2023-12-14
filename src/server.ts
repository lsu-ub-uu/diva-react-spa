import express, { Application } from 'express';
import axios from 'axios';
import { configureServer } from './config/configureServer';
import { createTextDefinition } from './textDefinition/textDefinition';
import { listToPool } from './utils/structs/listToPool';
import {
  BFFGuiElement,
  BFFMetadata,
  BFFMetadataItemCollection,
  BFFPresentation,
  BFFPresentationGroup,
  BFFText,
  BFFValidationType
} from './config/bffTypes';
import {
  getRecordDataById,
  getRecordDataListByType,
  getSearchResultDataListBySearchType,
  postRecordData,
  updateRecordDataById
} from './cora/cora';
import { DataGroup, DataListWrapper, RecordWrapper } from './utils/cora-data/CoraData';
import { transformCoraTexts } from './config/transformTexts';
import { transformMetadata } from './config/transformMetadata';
import { transformCoraPresentations } from './config/transformPresentations';
import { transformCoraValidationTypes } from './config/transformValidationTypes';
import { Dependencies } from './formDefinition/formDefinitionsDep';
import {
  createFormDefinition,
  createFormMetaData,
  createFormMetaDataPathLookup
} from './formDefinition/formDefinition';
import authRoute from './routes/authRoute';
import { extractIdFromRecordInfo } from './utils/cora-data/CoraDataTransforms';
import { injectRecordInfoIntoDataGroup, transformToCoraData } from './config/transformToCora';
import { cleanJson } from './utils/structs/removeEmpty';
import { transformRecord } from './config/transformRecord';

const PORT = process.env.PORT || 8080;
const { CORA_API_URL } = process.env;

axios.defaults.baseURL = CORA_API_URL;

const app: Application = express();

configureServer(app);
// loadCoraDefinitions()  // keeps them in memory some way... redis, node-cache

app.use('/api/auth', authRoute);
app.use('/api/translations/:lang', async (req, res) => {
  try {
    const response = await getRecordDataListByType<DataListWrapper>('text', '');
    const texts = transformCoraTexts(response.data);
    const textPool = listToPool<BFFText>(texts);
    const dependencies = {
      textPool
    };
    const textDefinitions = createTextDefinition(dependencies, req.params.lang);
    res.status(200).json(textDefinitions);
  } catch (error: unknown) {
    res.status(500).json('Internal server error');
  }
});

app.use('/api/validationTypes', async (req, res) => {
  try {
    const authToken = req.header('authToken') ?? '';
    const searchQuery: DataGroup = {
      name: 'validationTypeSearch',
      children: [
        {
          name: 'include',
          children: [
            {
              name: 'includePart',
              children: [
                {
                  name: 'validatesRecordTypeSearchTerm',
                  value: 'recordType_divaOutput'
                }
              ]
            }
          ]
        }
      ]
    };

    const response = await getSearchResultDataListBySearchType<DataListWrapper>(
      'validationTypeSearch',
      searchQuery,
      authToken
    );
    const validationTypes = transformCoraValidationTypes(response.data);
    const optionList = validationTypes.map((validationType) => ({
      value: validationType.id,
      label: validationType.nameTextId
    }));
    res.status(200).json(optionList);
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
});

const getPoolsFromCora = async (poolTypes: string[]) => {
  const promises = poolTypes.map((type) => getRecordDataListByType<DataListWrapper>(type, ''));
  return await Promise.all(promises);
};

const assembleCommonDependencies = async () => {
  const types = ['metadata', 'validationType'];
  const result = await getPoolsFromCora(types);
  const metadata = transformMetadata(result[0].data);
  const metadataPool = listToPool<BFFMetadata | BFFMetadataItemCollection>(metadata);

  const validationTypes = transformCoraValidationTypes(result[1].data);
  const validationTypePool = listToPool<BFFValidationType>(validationTypes);

  return {
    validationTypePool,
    metadataPool
  } as Dependencies;
};

const errorHandler = (error: unknown) => {
  //@ts-ignore
  const message: string = (error.message ?? 'Unknown error') as string;
  const status = axios.isAxiosError(error) ? error.response?.status : 500;
  return {
    message,
    status: status ?? 500
  };
};

app.post('/api/record/:validationTypeId/:recordId', async (req, res) => {
  try {
    const { validationTypeId, recordId } = req.params;
    const authToken = req.header('authToken') ?? '';

    const payload = cleanJson(req.body);
    const { lastUpdate, values } = payload;
    const recordType = Object.keys(values)[0];

    const dependencies = await assembleCommonDependencies();
    const { validationTypePool } = dependencies;

    if (!validationTypePool.has(validationTypeId)) {
      throw new Error(`Validation type [${validationTypeId}] does not exist`);
    }

    const FORM_MODE_UPDATE = 'update';
    const dataDivider = 'diva';

    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_UPDATE);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    const transformData = transformToCoraData(formMetaDataPathLookup, values);
    const updateGroup = injectRecordInfoIntoDataGroup(
      transformData[0] as DataGroup,
      validationTypeId,
      dataDivider,
      recordId,
      recordType,
      lastUpdate.updatedBy,
      lastUpdate.updateAt
    );

    const response = await updateRecordDataById<RecordWrapper>(
      recordId,
      updateGroup,
      recordType,
      authToken
    );

    res.status(response.status).json({});
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
});

app.post('/api/record/:validationTypeId', async (req, res) => {
  try {
    const { validationTypeId } = req.params;
    const authToken = req.header('authToken') ?? '';

    const payload = cleanJson(req.body);
    const recordType = Object.keys(payload)[0];

    const dependencies = await assembleCommonDependencies();
    const { validationTypePool } = dependencies;

    if (!validationTypePool.has(validationTypeId)) {
      throw new Error(`Validation type [${validationTypeId}] does not exist`);
    }

    const FORM_MODE_NEW = 'create';
    const dataDivider = 'diva';

    const formMetaData = createFormMetaData(dependencies, validationTypeId, FORM_MODE_NEW);
    const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
    const transformData = transformToCoraData(formMetaDataPathLookup, payload);
    const newGroup = injectRecordInfoIntoDataGroup(
      transformData[0] as DataGroup,
      validationTypeId,
      dataDivider
    );
    const response = await postRecordData<RecordWrapper>(newGroup, recordType, authToken);
    const id = extractIdFromRecordInfo(response.data.record.data);

    res.status(response.status).json({ id }); // return id for now
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
});

app.get('/api/record/:recordType/:recordId', async (req, res) => {
  try {
    const { recordType, recordId } = req.params;
    const authToken = req.header('authToken') ?? '';

    // start loading dependencies
    const types = ['metadata', 'validationType'];
    const result = await getPoolsFromCora(types);
    const metadata = transformMetadata(result[0].data);
    const metadataPool = listToPool<BFFMetadata | BFFMetadataItemCollection>(metadata);

    const validationTypes = transformCoraValidationTypes(result[1].data);
    const validationTypePool = listToPool<BFFValidationType>(validationTypes);

    const dependencies = {
      validationTypePool,
      metadataPool
    } as Dependencies;
    // end dependencies

    const response = await getRecordDataById<RecordWrapper>(recordType, recordId, authToken);
    const recordWrapper = response.data;
    const record = transformRecord(dependencies, recordWrapper);
    res.status(response.status).json(record);
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
});

app.use('/api/form/:validationTypeId/:mode', async (req, res) => {
  try {
    const { validationTypeId, mode } = req.params;

    if (!['create', 'update'].includes(mode)) {
      throw new Error(`Mode [${mode}] is not supported`);
    }
    const types = ['metadata', 'presentation', 'validationType', 'guiElement'];
    const result = await getPoolsFromCora(types);

    const metadata = transformMetadata(result[0].data);
    const metadataPool = listToPool<BFFMetadata | BFFMetadataItemCollection>(metadata);
    const presentation = transformCoraPresentations(result[1].data);
    const guiElements = transformCoraPresentations(result[3].data);

    const presentationPool = listToPool<BFFPresentation | BFFPresentationGroup | BFFGuiElement>([
      ...presentation,
      ...guiElements
    ]);

    const validationTypes = transformCoraValidationTypes(result[2].data);
    const validationTypePool = listToPool<BFFValidationType>(validationTypes);

    if (!validationTypePool.has(validationTypeId)) {
      throw new Error(`Validation type [${validationTypeId}] does not exist`);
    }

    const dependencies = {
      validationTypePool,
      metadataPool,
      presentationPool
    } as Dependencies;

    const formDef = createFormDefinition(
      dependencies,
      validationTypeId,
      mode as 'create' | 'update'
    );1
    res.status(200).json(formDef);
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
});

app.listen(PORT, (): void => {
  console.log(`Server running at ${PORT}`);
  console.log(`Cora API-url ${CORA_API_URL}`);
});
