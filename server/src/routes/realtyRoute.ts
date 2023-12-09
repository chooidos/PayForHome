import express from 'express';
import {
  addRealty,
  assignUtility,
  editRealty,
  getAllRealty,
  removeRealty,
} from './../controllers/realtyController';

const realtyRouter = express.Router();

realtyRouter.get('/', getAllRealty);
realtyRouter.post('/', addRealty);
realtyRouter.put('/:id', editRealty);
realtyRouter.delete('/:id', removeRealty);
realtyRouter.post('/add-utility/:id', assignUtility);
realtyRouter.delete('/delete-utility/:id', addRealty);

export default realtyRouter;
