import express from 'express';
import { getAllResearchSubjects } from '../controllers/researchSubjectsController';

const researchSubjectsRoute = express.Router();

// recordTypeRoute.route('/').get(getRecordType);
researchSubjectsRoute.route('/list:tree?').get(getAllResearchSubjects);

export default researchSubjectsRoute;
