import express from 'express';
import {
  parkCar,
  getTicket
} from '../controllers/parkingLotController';

const router = express.Router();

router.post('/park', parkCar);
router.get('/ticket/:regnum', getTicket)
router.get('/ticket', getTicket)

export default router;