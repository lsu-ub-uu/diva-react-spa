import express from 'express';
import {
  getAdminPersonSearch,
  getPublicPersonSearch,
} from '../controllers/searchController';

const searchRoute = express.Router();

// recordTypeRoute.route('/').get(getRecordType);
searchRoute.route('/admin/person/:searchQuery').get(getAdminPersonSearch);
searchRoute.route('/public/person/:searchQuery').get(getPublicPersonSearch);

export default searchRoute;
