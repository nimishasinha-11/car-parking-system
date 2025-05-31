import { Request, Response } from 'express';
import { 
    initializeParkingLot, 
    parkCar, 
    clearSlot,
    getStatus
} from '../controllers/parkingLotController';

const mockRequest = (body = {}) => ({
    body
} as Request);

type MockResponse = {
    status: ReturnType<typeof jest.fn>;
    json: ReturnType<typeof jest.fn>;
};

const mockResponse = (): MockResponse => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    return res;
};

describe('Parking Lot Tests', () => {
    let req: Request;
    let res: MockResponse;

    beforeEach(() => {
        res = mockResponse();
    });

    test('initialize parking lot with 5 slots', () => {
        req = mockRequest({ no_of_slots: 5 });
        initializeParkingLot(req, res as unknown as Response);
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ total_slots: 5 });
    });

    test('Park a car in the parking lot', () => {
        req = mockRequest({ no_of_slots: 5 });
        initializeParkingLot(req, res as unknown as Response);

        const car = {
            car_reg_no: 'KA01HH1234',
            car_colour: 'Blue',
            is_ev: false
        };
        req = mockRequest(car);
        parkCar(req, res as unknown as Response);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            allocated_slot_number: expect.any(Number)
        }));
    });

    test('remove car from parking slot', () => {
        req = mockRequest({ no_of_slots: 5 });
        initializeParkingLot(req, res as unknown as Response);

        const car = {
            car_reg_no: 'KA01HH1234',
            car_colour: 'Blue',
            is_ev: false
        };
        req = mockRequest(car);
        parkCar(req, res as unknown as Response);

        const slot = res.json.mock.calls[res.json.mock.calls.length - 1][0].allocated_slot_number;

        req = mockRequest({ slot_number: slot });
        clearSlot(req, res as unknown as Response);

        expect(res.json).toHaveBeenCalledWith({ freed_slot_number: slot });
    });

    test('show current parking lot status', () => {
        req = mockRequest({ no_of_slots: 5 });
        initializeParkingLot(req, res as unknown as Response);

        req = mockRequest();
        getStatus(req, res as unknown as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
}); 