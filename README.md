# 🚗 Car Parking System

## 📝 About The Project

This is a simple car parking management system that helps track parking slots and vehicles. It's like a digital parking lot manager!

## ✨ Features

- Initialize and manage parking lots
- Park cars and get parking tickets
- Track cars by color
- View parking status
- Calculate parking revenue
- Clear parking slots

## 🚀 API Endpoints

### 1. Initialize Parking Lot
- **POST** `/parking_lot`
- Creates initial parking lot setup

### 2. Increment Parking Lot
- **PATCH** `/parking_lot`
- Adds more parking spaces to existing lot

### 3. Park Car
- **POST** `/park`
- Parks a car in an available slot

### 4. Get Cars by Color
- **GET** `/registration_numbers/:car_colour`
- Gets registration numbers of cars by color in the parking

### 5. Get Slot by Color
- **GET** `/slot_number/:car_colour`
- Gets slot numbers where cars of specific color are parked

### 6. Clear Slot
- **POST** `/clear`
- Removes a car from a parking slot

### 7. Get Status
- **GET** `/status`
- Shows current parking lot status

### 8. Get Ticket
- **GET** `/ticket/:regnum`
- Get ticket details for a specific registration number
- **GET** `/ticket`
- Get all ticket details

### 9. Get Revenue
- **GET** `/revenue`
- Shows total parking revenue

## 🏃‍♂️ How to Run

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run dev
```

3. Run tests:
```bash
npm test
```