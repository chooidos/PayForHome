import express from 'express';

import {
  addUtility,
  editUtility,
  getAllUtilities,
} from '../controllers/utilityController';

const utilityRouter = express.Router();

utilityRouter.get('/', getAllUtilities);
utilityRouter.post('/', addUtility);
utilityRouter.put('/:id', editUtility);

export default utilityRouter;
