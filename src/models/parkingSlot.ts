import { Car } from './car';

export interface ParkingSlot {
  slotNumber: number;
  isOccupied: boolean;
  parkedCar?: Car;
  isEv: boolean // additional feature
}

export interface StatusResponse {
  slot_no: number
  registartion_no: string;
  colour: string;
  is_ev: boolean
}

export interface clearSlotRequest {
  slot_number?: number;
  car_reg_no?: string
}
