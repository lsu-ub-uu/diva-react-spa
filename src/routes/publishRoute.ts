import express from 'express';
import { postPublication } from '../controllers/publishController';

const searchRoute = express.Router();

searchRoute.route('/:publicationType').get(postPublication);

export default searchRoute;
