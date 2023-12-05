import express from 'express';
import {
  getSpecificPublication,
  getAllPublicationsTypes
} from '../controllers/publicationController';

const publicationRouter = express.Router();

publicationRouter.route('/types').get(getAllPublicationsTypes);
publicationRouter.route('/:id').get(getSpecificPublication);

export default publicationRouter;
