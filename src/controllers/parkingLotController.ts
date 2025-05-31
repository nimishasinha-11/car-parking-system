import { Request, Response } from 'express';
import { Car } from '../models/car';
import { ParkingLotService } from '../services/parkingLotService';
import { IncrementParkingLot, InitialiseRequest } from '../models/parkingLot';
import { clearSlotRequest } from '../models/parkingSlot';

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
  if (!parkingService.isAlreadyInitialised()) {
    res.status(400).json({ message: 'Parking lot is not initialised'})
    return
  }
  const car: Car = req.body;
  const slotNumber = parkingService.parkCar(car); 
  if (!slotNumber) {
    res.status(400).json({ message: 'Parking is full' });
    return
  }
  res.status(201).json({allocated_slot_number: slotNumber}); 
};

export const getRegnumByColour = (req: Request, res: Response) => {
  var colour = req.params.car_colour
  var regNum = parkingService.getRegNumByColour(colour)
  res.status(200).json(regNum)
}

export const getSlotnumByColour = (req: Request, res: Response) => {
  var colour = req.params.car_colour
  var slotNum = parkingService.getSlotNumByColour(colour)
  res.status(200).json(slotNum)
}

export const getStatus = (req: Request, res: Response) => {
  var occupiedSlots = parkingService.getStatus()
  res.status(200).json(occupiedSlots)
}

export const clearSlot = (req: Request, res: Response) => {
  const clearSlotRequest: clearSlotRequest = req.body
  if (clearSlotRequest.slot_number) {
    const slot = parkingService.clearSlotBySlotNo(clearSlotRequest.slot_number)
    if (slot == 0) {
      res.status(404).json({error: 'slot number not found or is already free'})
      return
    }
    res.status(200).json({'freed_slot_number': slot})
    return
  } else if (clearSlotRequest.car_reg_no) {
    const slot = parkingService.clearSlotByRegNum(clearSlotRequest.car_reg_no)
    if (slot == 0) {
      res.status(404).json({error: 'slot number not found for reg number'})
      return
    }
    res.status(200).json({'freed_slot_number': slot})
    return
  }
  res.status(400).json({message: "invalid request"})
}

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