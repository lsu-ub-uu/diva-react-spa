import express from 'express';
import {
  // getRecordType,
  getRecordTypeByName,
} from '../controllers/recordTypeController';

const recordTypeRoute = express.Router();

// recordTypeRoute.route('/').get(getRecordType);
recordTypeRoute.route('/:name').get(getRecordTypeByName);

export default recordTypeRoute;
