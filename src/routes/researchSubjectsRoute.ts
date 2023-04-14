import express from 'express';

import { getResearchSubjects } from '../controllers/researchSubjectsController.js';

const researchSubjectsRoute = express.Router();

researchSubjectsRoute.route('/').get(getResearchSubjects);

export default researchSubjectsRoute;
