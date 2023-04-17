/* import compression from 'compression';
import cors from 'cors'; */

import express, { Application } from 'express';

export const configureServer = (app: Application) => {
  app.use(express.json());
  // app.use(compression())
  // app.use(cors())

  return app;
};
