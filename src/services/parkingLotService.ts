// src/services/parkingLot.service.ts

import { Car } from '../models/car';
import { ParkingSlot } from '../models/parkingSlot';
import { Ticket } from '../models/ticket';
import { v4 as uuidv4 } from 'uuid';

export class ParkingLotService {
  private slots: ParkingSlot[] = [];
  private tickets: Ticket[] = [];
  private isInitialised: boolean = false

  initializeParkingLot(size: number): number {
    this.slots = [];
    var j = 0
    for (let i = 1; i <= size; i++) {
        var isElectrical = false
        if (j < (0.2 * size)){
            isElectrical = true
        }
        this.slots.push({ slotNumber: i, isOccupied: false, isEv: isElectrical });
        j ++
    }
    this.isInitialised = true
    return this.slots.length
  }

  incrementParkingLot(size: number): number {
    for (let i = 1; i <= size; i++) {
        this.slots.push({ slotNumber: i, isOccupied: false, isEv: false });
    }
    return this.slots.length
  }

  isAlreadyInitialised() : boolean {
    return this.isInitialised
  }

  parkCar(car: Car): | number | null { 
    const freeSlot = this.slots.find((slot) => !slot.isOccupied && slot.isEv===car.is_ev);
    if (!freeSlot) return null;

    freeSlot.isOccupied = true;
    freeSlot.parkedCar = car;

    const ticket: Ticket = {
      ticketId: uuidv4(),
      slotNumber: freeSlot.slotNumber,
      registrationNumber: car.car_reg_no,
      issuedAt: new Date(),
    };
    this.tickets.push(ticket);
    return ticket.slotNumber;
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
      (s) => s.isOccupied && s.parkedCar?.car_reg_no === registrationNumber
    );
    return slot ? slot.slotNumber : null;
  }

}