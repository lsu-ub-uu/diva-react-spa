import express from 'express';
import {
  getPublication,
  getSpecificPublication,
} from '../controllers/publicationController';

const publicationRouter = express.Router();

publicationRouter.route('/list').get(getPublication);
publicationRouter.route('/:id').get(getSpecificPublication);

export default publicationRouter;
