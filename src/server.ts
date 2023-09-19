import express, { Application } from 'express';
import { configureServer } from './config/configureServer';
import { createTextDefinition } from './textDefinition/textDefinition';
import { listToPool } from './utils/structs/listToPool';
import { BFFText } from './config/bffTypes';
import { getRecordDataListByType } from './cora/cora';
import { DataListWrapper } from './utils/cora-data/CoraData';
import { transformCoraTexts } from './config/transformTexts';

const PORT = process.env.PORT || 8080;
export const CORA_API_URL = process.env.CORA_API_URL || '';

const app: Application = express();

configureServer(app);
// loadCoraDefinitions()  // keeps them in memory some way... redis, node-cache

app.use('/api/translations/:lang', async (req, res, next) => {
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

app.listen(PORT, (): void => {
  console.log(`Server running at ${PORT}`);
  console.log(`Cora API-url ${CORA_API_URL}`);
});
