// import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';

import express, { Application, Request } from 'express';
import { findMetadataInCora } from '../utils/api/metaData/metadata';

export const configureServer = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors<Request>({
      origin: '*',
    }),
  );

  findMetadataInCora();

  return app;
};
