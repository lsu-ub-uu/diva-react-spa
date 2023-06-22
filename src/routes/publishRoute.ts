import express from 'express';
import { getPublicationForm } from '../controllers/publishController';

const searchRoute = express.Router();

searchRoute.route('/:publicationType').get(getPublicationForm);

export default searchRoute;
