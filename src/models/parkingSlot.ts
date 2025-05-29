import { Car } from './car';

export interface ParkingSlot {
  slotNumber: number;
  isOccupied: boolean;
  parkedCar?: Car; 
}