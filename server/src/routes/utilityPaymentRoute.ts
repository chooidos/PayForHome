import express from 'express';

import { addUtility, editUtility } from '../controllers/utilityController';
import {
  addUtilityPayment,
  getAllUtilityPayments,
} from '../controllers/utilityPaymentController';

const utilityPaymentRouter = express.Router();

utilityPaymentRouter.get('/:realtyId/:utilityId', getAllUtilityPayments);
utilityPaymentRouter.post('/:realtyId/:utilityId', addUtilityPayment);
utilityPaymentRouter.put('/:realtyId/:utilityId', editUtility);

export default utilityPaymentRouter;
