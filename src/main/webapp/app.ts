/*
 * Copyright 2023 Uppsala University Library
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
 */

import express, { Application } from 'express';
import axios from 'axios';
import { configureServer, loadStuffOnServerStart } from './config/configureServer';
import {
  authRoute,
  translationRoute,
  validationTypesRoute,
  recordRoute,
  formRoute,
  refreshDefinitionsRoute,
  searchRoute
} from './routes';
import EventEmitter from 'events';

export const eventEmitter = new EventEmitter();
const PORT = process.env.PORT ?? 8080;

const { CORA_API_URL, CORA_LOGIN_URL } = process.env;

axios.defaults.baseURL = CORA_API_URL;

export const app: Application = express();

configureServer(app);

interface ErrorWithMessage {
  message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (error as ErrorWithMessage).message !== undefined;
}

export const errorHandler = (error: unknown) => {
  const message: string = isErrorWithMessage(error) ? error.message : 'Unknown error';
  const status = axios.isAxiosError(error) ? error.response?.status : 500;
  return {
    message,
    status: status ?? 500
  };
};

export const CORA_DATA_LOADED_EVENT = 'coraMetadataLoaded';

app.get('/', (req, res) => {
  res.status(200).json();
});
app.use('/api/auth', authRoute);
app.use('/api/translations/', translationRoute);

app.use('/api/validationTypes', validationTypesRoute);
app.use('/api/search', searchRoute);
app.use('/api/record', recordRoute);
app.use('/api/form', formRoute);
app.use('/api/refreshDefinitions', refreshDefinitionsRoute);

export const start = (port?: number) => {
  return app.listen(port ?? PORT, (): void => {
    console.log(`Server running at ${PORT}`);
    console.log(`Cora API-url ${CORA_API_URL}`);
    console.log(`CORA_LOGIN_URL-url ${CORA_LOGIN_URL}`);
    loadStuffOnServerStart().then(() => {
      eventEmitter.emit(CORA_DATA_LOADED_EVENT);
      console.log('Loaded stuff from cora');
    });
  });
};
