import { Request, Response } from 'express';
import { Car } from '../models/car';
import { ParkingLotService } from '../services/parkingLotService';

const parkingService = new ParkingLotService();
parkingService.initializeParkingLot(2);


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