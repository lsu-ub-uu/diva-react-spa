import express from 'express';
import {
  getPublicPersonSearch,
  getPublicSearchData,
} from '../controllers/searchController';

const searchRoute = express.Router();

// recordTypeRoute.route('/').get(getRecordType);
searchRoute.route('/admin/:searchQuery').get(getPublicPersonSearch);
searchRoute.route('/public/:name').get(getPublicSearchData);

export default searchRoute;
