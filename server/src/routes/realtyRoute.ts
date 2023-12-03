import express from 'express';
import {
  addRealty,
  editRealty,
  getAllRealty,
  removeRealty,
} from './../controllers/realtyController';

const realtyRouter = express.Router();

realtyRouter.get('/', getAllRealty);
realtyRouter.post('/', addRealty);
realtyRouter.put('/:name', editRealty);
realtyRouter.delete('/:name', removeRealty);

export default realtyRouter;
