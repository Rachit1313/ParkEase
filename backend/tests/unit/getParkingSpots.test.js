
// File: getParkingSpots.test.js
// ------------------
// This file contains unit test to get parking spots

// Author: Heavendeep kaur
// Date: February 23, 2024

// Import the required modules and the route handler function
const getParkingSpots = require('../../src/routes/api/getParkingSpots');
const db = require('../../src/database');

// Simulated database query function
const queryFn = jest.fn();

// Unit test for getParkingSpots route handler
describe('getParkingSpots route', () => {
  test('returns available spots when valid inputs are provided', async () => {
    // Simulate successful database query and provide results
    const mockAvailableSpots = [{ SpotID: 1, SpotNumber: 'A1' }, { SpotID: 2, SpotNumber: 'B2' }];
    queryFn.mockImplementation((sql, params, callback) => {
      callback(null, mockAvailableSpots);
    });
    db.query = queryFn;

    // Mock request and response objects
    const req = { body: { garageId: 'garage123', checkInTime: '2024-02-23 10:00:00', checkOutTime: '2024-02-23 12:00:00' } };
    const res = { 
      status: jest.fn().mockReturnThis(), 
      json: jest.fn() 
    };

    await getParkingSpots(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ availableSpots: mockAvailableSpots });
  });

  test('returns error when database query fails', async () => {
    // Simulate database query failure
    const mockError = new Error('Database query error');
    queryFn.mockImplementation((sql, params, callback) => {
      callback(mockError, null);
    });
    db.query = queryFn;

    // Mock request and response objects
    const req = { body: { garageId: 'garage123', checkInTime: '2024-02-23 10:00:00', checkOutTime: '2024-02-23 12:00:00' } };
    const res = { 
      status: jest.fn().mockReturnThis(), 
      send: jest.fn() 
    };

    await getParkingSpots(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error fetching available spots');
  });
});
