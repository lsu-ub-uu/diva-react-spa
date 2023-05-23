import express from 'express';
import { getSearchPersonsByGeneralSearch } from '../controllers/searchController';

const searchRoute = express.Router();

searchRoute
  .route('/admin/person/:searchQuery')
  .get(getSearchPersonsByGeneralSearch);

export default searchRoute;
