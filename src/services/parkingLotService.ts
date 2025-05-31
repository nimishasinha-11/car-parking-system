import { exitCode } from 'process';
import { Car } from '../models/car';
import { ParkingSlot, StatusResponse } from '../models/parkingSlot';
import { Ticket } from '../models/ticket';
import { v4 as uuidv4 } from 'uuid';

export class ParkingLotService {
    private slots: ParkingSlot[] = [];
    private tickets: Ticket[] = [];
    private isInitialised: boolean = false
    private revenue: number = 0

    initializeParkingLot(size: number): number {
        this.slots = [];
        var j = 0
        for (let i = 1; i <= size; i++) {
            var isElectrical = false
            if (j < (0.5 * size)) {
                if (size > 1) {
                    isElectrical = true
                }
            }
            this.slots.push({ slotNumber: i, isOccupied: false, isEv: isElectrical });
            j++
        }
        this.isInitialised = true
        return this.slots.length
    }

    incrementParkingLot(size: number): number {
        var j = 0
        for (let i = 1; i <= size; i++) {
            var isElectrical = false
            if (j < (0.5 * size)) {
                if (size > 1) {
                    isElectrical = true
                }
            }
            this.slots.push({ slotNumber: i, isOccupied: false, isEv: isElectrical });
        }
        return this.slots.length
    }

    isAlreadyInitialised(): boolean {
        return this.isInitialised
    }

    parkCar(car: Car): | number | null {
        const freeSlot = this.slots.find((slot) => !slot.isOccupied && slot.isEv === car.is_ev);
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

    getAllTicket(): Ticket[] | null {
        return this.tickets
    }

    getRegNumByColour(colour: string): string[] {
        var slots = this.slots.filter((s) => s.parkedCar?.car_colour == colour);
        let regNums: string[] = [];
        for (let index = 0; index < slots.length; index++) {
            const element = slots[index];
            regNums.push(String(element.parkedCar?.car_reg_no))
        }
        return regNums
    }

    getSlotNumByColour(colour: string): number[] {
        var slots = this.slots.filter((s) => s.parkedCar?.car_colour == colour);
        let slotNum: number[] = [];
        for (let index = 0; index < slots.length; index++) {
            const element = slots[index];
            slotNum.push(element.slotNumber)
        }
        return slotNum
    }

    getStatus(): StatusResponse[] {
        var slots = this.slots.filter((slot) => slot.isOccupied);
        let res: StatusResponse[] = []
        for (let index = 0; index < slots.length; index++) {
            const s: StatusResponse = {
                slot_no: slots[index].slotNumber,
                registartion_no: String(slots[index].parkedCar?.car_reg_no),
                colour: String(slots[index].parkedCar?.car_colour),
                is_ev: Boolean(slots[index].parkedCar?.is_ev)
            }
            res.push(s)
        }
        return res
    }

    clearSlotBySlotNo(slotNo: number): number {
        var slots = this.slots.filter((slot) => slot.slotNumber == slotNo && slot.isOccupied === true)
        if (slots.length === 0) {
            return 0
        }
        if (slots[0].parkedCar?.is_ev) {
            this.revenue += 100
        } else {
            this.revenue += 50
        }

        var ticket = this.tickets.filter((ticket) => ticket.registrationNumber == slots[0].parkedCar?.car_reg_no && ticket.exitedAt == undefined);
        if (ticket.length > 0) {
            ticket[0].exitedAt = new Date()
        }
        
        slots[0].isOccupied = false
        slots[0].parkedCar = undefined
        return slots[0].slotNumber
    }

    clearSlotByRegNum(regNum: string): number {
        var slots = this.slots.filter((slot) => slot.parkedCar?.car_reg_no == regNum)
        if (slots.length === 0) {
            return 0
        }
        if (slots[0].parkedCar?.is_ev) {
            this.revenue += 100
        } else {
            this.revenue += 50
        }

        var ticket = this.tickets.filter((ticket) => ticket.registrationNumber == slots[0].parkedCar?.car_reg_no && ticket.exitedAt == undefined);
        if (ticket.length > 0) {
            ticket[0].exitedAt = new Date()
        }

        slots[0].isOccupied = false
        slots[0].parkedCar = undefined
        return slots[0].slotNumber
    }

    getTicketTicketByRegNum(registrationNumber: string): Ticket[] | null {
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

    getRevenue(): number {
        return this.revenue
    }
}
