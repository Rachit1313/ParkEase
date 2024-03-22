// File: getTodaysBookings.test.js
// -------------------------------
// This file contains Jest tests for the getTodaysBookings route implementation
// author: heaven

const getTodaysBookings = require('../../src/routes/v1/getTodaysBookings');
const db = require('../../src/database');
const logger = require('../../src/logger');

jest.mock('../../src/database');
jest.mock('../../src/logger');

describe('getTodaysBookings', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = {}; // Mock request object
        mockRes = { // Mock response object
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks(); // Clear previous mocks
    });

    it('should return 200 and today\'s bookings on success', async () => {
        // Mock today's date
        const today = new Date().toISOString().slice(0, 10);
        // Mock database response
        const mockBookings = [
            {
                Email: '[email protected]',
                amount: 100,
                parkingSpotNumber: 1,
                checkinTime: '10:00:00',
            },
        ];
        db.query.mockImplementation((query, params, callback) => {
            callback(null, mockBookings);
        });

        await getTodaysBookings(mockReq, mockRes);

        expect(db.query).toHaveBeenCalledWith(expect.any(String), [today], expect.any(Function));
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockBookings);
    });

    it('should return 500 if there is a database error', async () => {
        // Mock database error
        const error = new Error('Database error');
        db.query.mockImplementation((query, params, callback) => {
            callback(error, null);
        });

        await getTodaysBookings(mockReq, mockRes);

        expect(db.query).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalledWith('Error fetching today\'s bookings:', error);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith('Error fetching today\'s bookings');
    });
});