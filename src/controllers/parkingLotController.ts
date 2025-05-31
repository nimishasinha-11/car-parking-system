import { Request, Response } from 'express';
import { Car } from '../models/car';
import { ParkingLotService } from '../services/parkingLotService';
import { IncrementParkingLot, InitialiseRequest } from '../models/parkingLot';

const parkingService = new ParkingLotService();

export const initializeParkingLot = (req: Request, res: Response) => {
  const initaliseReqest: InitialiseRequest = req.body
  if (initaliseReqest.no_of_slots === 0) {
    res.status(400).json({ message: 'Number of slots must be greater than 0'})
    return
  }
  if (parkingService.isAlreadyInitialised()) {
    res.status(400).json({ message: 'Parking lot already initialised'})
    return
  }
  var totalSlots = parkingService.initializeParkingLot(initaliseReqest.no_of_slots);
  res.status(201).json({total_slots : totalSlots});
}

export const incrementParkingLot = (req: Request, res: Response) => {
  if (!parkingService.isAlreadyInitialised()) {
    res.status(400).json({ message: 'Parking lot is not initialised'})
    return
  }
  const incrementParkingLot: IncrementParkingLot = req.body
  var totalSlots = parkingService.incrementParkingLot(incrementParkingLot.increment_slot);
  res.status(200).json({total_slots : totalSlots});
}

export const parkCar = (req: Request, res: Response) => {
  const car: Car = req.body;
  const ticket = parkingService.parkCar(car);
  if (!ticket) {
    res.status(400).json({ message: 'Parking is full' });
    return
  }
  res.status(201).json(ticket);
};

export const getTicket = (req: Request, res: Response) => {
  var regNum = req.params.regnum
  if (regNum) {
    var  ticket = parkingService.getTicketTicketByRegNum(regNum)
    if (ticket == null) {
      res.status(404).json({ "message": "No ticket found with this registration number"})
      return
    } else {
      res.status(200).json(ticket[0])
      return
    }
    
  } else {
    res.status(200).json(parkingService.getAllTicket())

  }

}