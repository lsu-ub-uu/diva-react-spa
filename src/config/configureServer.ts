// import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';

import express, { Application, Request } from 'express';

export const configureServer = (app: Application) => {
  app.use(express.json());
  // app.use(compression())
  app.use(cors<Request>());

  return app;
};
