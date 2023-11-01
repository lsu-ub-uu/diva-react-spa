import express, { Application } from 'express';
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
import { getRecordDataListByType } from './cora/cora';
import { DataListWrapper } from './utils/cora-data/CoraData';
import { transformCoraTexts } from './config/transformTexts';
import { transformMetadata } from './config/transformMetadata';
import { transformCoraPresentations } from './config/transformPresentations';
import axios from 'axios';
import { transformCoraValidationTypes } from './config/transformValidationTypes';
import { Dependencies } from './formDefinition/formDefinitionsDep';
import { createFormDefinition } from './formDefinition/formDefinition';
import authRoute from './routes/authRoute';

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
      textPool: textPool
    };
    const textDefinitions = createTextDefinition(dependencies, req.params.lang);
    res.status(200).json(textDefinitions);
  } catch (error: unknown) {
    res.status(500).json('Internal server error');
  }
});

app.use('/api/form/:validationTypeId', async (req, res) => {
  try {
    const { validationTypeId } = req.params;
    const types = ['metadata', 'presentation', 'validationType', 'guiElement'];
    const promises = types.map((type) => getRecordDataListByType<DataListWrapper>(type, ''));
    const result = await Promise.all(promises);

    const metadata = transformMetadata(result[0].data);
    const metadataPool = listToPool<BFFMetadata | BFFMetadataItemCollection>(metadata);
    // console.log(result[3].data);
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
      validationTypePool: validationTypePool,
      metadataPool: metadataPool,
      presentationPool: presentationPool
    } as Dependencies;

    const formDef = createFormDefinition(dependencies, validationTypeId, 'new');
    res.status(200).json(formDef);
  } catch (error: unknown) {
    //@ts-ignore
    console.log(error.message);
    res.status(500).json('Internal server error').send();
  }
});

app.listen(PORT, (): void => {
  console.log(`Server running at ${PORT}`);
  console.log(`Cora API-url ${CORA_API_URL}`);
});
