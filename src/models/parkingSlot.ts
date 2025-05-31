import { Car } from './car';

export interface ParkingSlot {
  slotNumber: number;
  isOccupied: boolean;
  parkedCar?: Car; 
  isEv: boolean
}

export interface StatusResponse {
  slot_no: number
  registartion_no: string;
  colour: string;
  is_ev: boolean
}
