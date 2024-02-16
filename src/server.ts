import express, { Application } from 'express';
import axios from 'axios';
import { configureServer, dependencies, loadStuffOnServerStart } from './config/configureServer';
import {
  authRoute,
  translationRoute,
  divaOutputsRoute,
  validationTypesRoute,
  recordRoute,
  formRoute,
  refreshDefinitionsRoute
} from './routes';

// let PORT: string | 8080;
const PORT = process.env.NODE_ENV !== 'test' ? process.env.PORT || 8080 : 9090;
// const PORT = process.env.PORT || 8080;

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
app.get('/', (req, res) => {
  res.status(200).json();
});
app.use('/api/auth', authRoute);
app.use('/api/translations/', translationRoute);
app.use('/api/divaOutputs', divaOutputsRoute);
app.use('/api/validationTypes', validationTypesRoute);
app.use('/api/record', recordRoute);
app.use('/api/form', formRoute);
app.use('/api/refreshDefinitions', refreshDefinitionsRoute);

app.listen(PORT, (): void => {
  console.log(`Server running at ${PORT}`);
  console.log(`Cora API-url ${CORA_API_URL}`);
  loadStuffOnServerStart().then(() => {
    console.log('Loaded stuff from cora');
    // const definition = createLinkedRecordDefinition(dependencies, 'divaPersonOutputPLink');
    // console.log(JSON.stringify(definition, null, 1));
  });
});

export default app;
