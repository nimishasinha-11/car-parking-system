import { ParkingSlot } from './parkingSlot';

export interface ParkingLot {
  capacity: number;
  slots: ParkingSlot[];
}