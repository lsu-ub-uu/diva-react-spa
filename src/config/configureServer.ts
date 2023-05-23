// import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';

import express, { Application, Request } from 'express';

export const configureServer = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors<Request>({
      origin: '*',
    }),
  );

  return app;
};
