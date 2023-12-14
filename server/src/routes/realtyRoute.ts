import express from 'express';
import {
  addRealty,
  assignUtility,
  editRealty,
  getAllRealty,
  removeRealty,
  removeUtility,
} from './../controllers/realtyController';

const realtyRouter = express.Router();

realtyRouter.get('/', getAllRealty);
realtyRouter.post('/', addRealty);
realtyRouter.put('/:id', editRealty);
realtyRouter.delete('/:id', removeRealty);
realtyRouter.post('/add-utility/:id', assignUtility);
realtyRouter.put('/delete-utility/:id', removeUtility);

export default realtyRouter;
