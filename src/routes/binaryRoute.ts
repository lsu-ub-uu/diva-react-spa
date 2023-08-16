import express from 'express';
import { postBinary } from '../controllers/binaryController';

const binaryRouter = express.Router();

binaryRouter.route('/').post(postBinary);

export default binaryRouter;
