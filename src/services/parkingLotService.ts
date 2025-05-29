// src/services/parkingLot.service.ts

import { Car } from '../models/car';
import { ParkingSlot } from '../models/parkingSlot';
import { Ticket } from '../models/ticket';
import { v4 as uuidv4 } from 'uuid';

export class ParkingLotService {
  private slots: ParkingSlot[] = [];
  private capacity = 0;
  private tickets: Ticket[] = [];

  initializeParkingLot(size: number): void {
    this.capacity = size;
    this.slots = [];
    for (let i = 1; i <= size; i++) {
      this.slots.push({ slotNumber: i, isOccupied: false });
    }
  }

  expandParkingLot(extraSlots: number): void {
    const start = this.slots.length + 1;
    for (let i = start; i < start + extraSlots; i++) {
      this.slots.push({ slotNumber: i, isOccupied: false });
    }
    this.capacity += extraSlots;
  }

  parkCar(car: Car): Ticket | null {
    const freeSlot = this.slots.find((slot) => !slot.isOccupied);
    if (!freeSlot) return null;

    freeSlot.isOccupied = true;
    freeSlot.parkedCar = car;

    const ticket: Ticket = {
      ticketId: uuidv4(),
      slotNumber: freeSlot.slotNumber,
      registrationNumber: car.registrationNumber,
      issuedAt: new Date(),
    };
    this.tickets.push(ticket);
    return ticket;
  }

  freeSlot(slotNumber: number): boolean {
    const slot = this.slots.find((s) => s.slotNumber === slotNumber);
    if (!slot || !slot.isOccupied) return false;
    slot.isOccupied = false;
    delete slot.parkedCar;
    return true;
  }

  getOccupiedSlots(): ParkingSlot[] {
    return this.slots.filter((slot) => slot.isOccupied);
  }

  getAllTicket(): Ticket[] | null{
    return this.tickets
  }

  getTicketTicketByRegNum(registrationNumber: string): Ticket[] | null  {
    var ticket = this.tickets.filter((ticket) => ticket.registrationNumber == registrationNumber);
    if (ticket.length == 0) {
        return null
    } else {
        return ticket
    }
  }


  getSlotByRegistration(registrationNumber: string): number | null {
    const slot = this.slots.find(
      (s) => s.isOccupied && s.parkedCar?.registrationNumber === registrationNumber
    );
    return slot ? slot.slotNumber : null;
  }

}