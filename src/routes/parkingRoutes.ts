import express from 'express';
import {
  parkCar,
  getTicket,
  initializeParkingLot
} from '../controllers/parkingLotController';

const router = express.Router();

router.post('/parking_lot', initializeParkingLot)
router.post('/park', parkCar);
router.get('/ticket/:regnum', getTicket)
router.get('/ticket', getTicket)

export default router;