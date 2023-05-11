import express from 'express';
import { getAllSubjectCategories } from '../controllers/subjectCategoriesController';

const subjectCategoriesRoute = express.Router();

// recordTypeRoute.route('/').get(getRecordType);
subjectCategoriesRoute.route('/list').get(getAllSubjectCategories);

export default subjectCategoriesRoute;
