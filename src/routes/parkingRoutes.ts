import express from 'express';
import {
  parkCar,
  getTicket,
  initializeParkingLot,
  incrementParkingLot,
  getRegnumByColour,
  getSlotnumByColour,
  getStatus
} from '../controllers/parkingLotController';

const router = express.Router();

router.post('/parking_lot', initializeParkingLot)
router.patch('/parking_lot', incrementParkingLot)
router.post('/park', parkCar);
router.get('/registration_numbers/:car_colour', getRegnumByColour );
router.get('/slot_number/:car_colour', getSlotnumByColour );
router.get('/status', getStatus)
router.get('/ticket/:regnum', getTicket)
router.get('/ticket', getTicket)

export default router;
