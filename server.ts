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
 */

import 'dotenv/config';
import { createRequestHandler } from '@remix-run/express';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dependencies, loadStuffOnServerStart } from '@/data/pool.server';
import {
  authRoute,
  formRoute,
  recordRoute,
  refreshDefinitionsRoute,
  searchRoute,
  translationRoute,
  validationTypesRoute,
} from './bff/src/main/webapp/routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { CORA_API_URL, CORA_LOGIN_URL, NODE_ENV, PORT } = process.env;

const viteDevServer =
  NODE_ENV === 'production'
    ? undefined
    : await import('vite').then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      );

const remixHandler = createRequestHandler({
  getLoadContext: () => ({ dependencies }),
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
    : // @ts-expect-error The built file is not ts
      await import('./dist/server/index.js'),
});

const app = express();

/*app.use(express.json());
app.use(express.urlencoded({ extended: true }));*/

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use(
    '/assets',
    express.static('dist/client/assets', { immutable: true, maxAge: '1y' }),
  );
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('dist/client', { maxAge: '1h' }));

app.use(morgan('tiny'));

if (NODE_ENV !== 'production') {
  app.get('/devLogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'devLogin.html'));
  });
}

// Remix SSR requests
app.all('*', remixHandler);

const port = PORT || 5173;
app.listen(port, () => {
  console.log(`Cora API-url ${CORA_API_URL}`);
  console.log(`CORA_LOGIN_URL-url ${CORA_LOGIN_URL}`);
  console.log(`Express server listening at http://localhost:${port}`);
  loadStuffOnServerStart().then(() => {
    // eventEmitter.emit(CORA_DATA_LOADED_EVENT);
    console.log('Loaded stuff from Cora');
  });
});
