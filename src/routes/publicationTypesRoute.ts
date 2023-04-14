import express from 'express';

import { getPublicationTypes } from '../controllers/publicationTypesController.js';

const publicationTypesRoute = express.Router();

publicationTypesRoute.route('/').get(getPublicationTypes);

export default publicationTypesRoute;
