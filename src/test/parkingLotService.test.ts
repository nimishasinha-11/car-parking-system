import { ParkingLotService } from '../services/parkingLotService';

describe('ParkingLotService', () => {
    let parkingService: ParkingLotService;

    beforeEach(() => {
        parkingService = new ParkingLotService();
    });

    test('should initialize parking lot', () => {
        const size = 5;
        const totalSlots = parkingService.initializeParkingLot(size);
        expect(totalSlots).toBe(size);
    });

    test('should park a car successfully', () => {
        parkingService.initializeParkingLot(5);
        const car = {
            car_reg_no: 'ABC123',
            car_colour: 'Red',
            is_ev: false
        };
        const slotNumber = parkingService.parkCar(car);
        expect(slotNumber).not.toBeNull();
    });

    test('should clear parking slot', () => {
        parkingService.initializeParkingLot(5);
        const car = {
            car_reg_no: 'ABC123',
            car_colour: 'Red',
            is_ev: false
        };
        const slotNumber = parkingService.parkCar(car);
        const result = parkingService.clearSlotBySlotNo(slotNumber!);
        expect(result).toBe(slotNumber);
    });

    test('should show parking lot status', () => {
        parkingService.initializeParkingLot(5);
        const car = {
            car_reg_no: 'ABC123',
            car_colour: 'Red',
            is_ev: false
        };
        parkingService.parkCar(car);
        const status = parkingService.getStatus();
        expect(status.length).toBe(1);
        expect(status[0].registartion_no).toBe('ABC123');
    });

    test('should calculate parking revenue', () => {
        parkingService.initializeParkingLot(5);
        const car = {
            car_reg_no: 'ABC123',
            car_colour: 'Red',
            is_ev: false
        };
        const slotNumber = parkingService.parkCar(car);
        parkingService.clearSlotBySlotNo(slotNumber!);
        expect(parkingService.getRevenue()).toBe(50);
    });
}); 