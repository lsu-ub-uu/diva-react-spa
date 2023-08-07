import express from 'express';
import { getPublicationForm } from '../controllers/publishController';

const publishRoute = express.Router();

publishRoute.route('/:validationType').get(getPublicationForm);

export default publishRoute;
