import express from 'express';
import {
  parkCar,
  getTicket,
  initializeParkingLot,
  incrementParkingLot
} from '../controllers/parkingLotController';

const router = express.Router();

router.post('/parking_lot', initializeParkingLot)
router.patch('/parking_lot', incrementParkingLot)
router.post('/park', parkCar);
router.get('/ticket/:regnum', getTicket)
router.get('/ticket', getTicket)

export default router;