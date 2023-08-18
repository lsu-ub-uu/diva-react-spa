import express from 'express';
import {
  getPublicationForm,
  getNewPublicationForm,
} from '../controllers/publishController';

const publishRoute = express.Router();

publishRoute.route('/:validationType').get(getPublicationForm);
publishRoute.route('/:validationType/new').get(getNewPublicationForm);

export default publishRoute;
