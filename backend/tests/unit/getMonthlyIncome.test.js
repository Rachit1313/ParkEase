// File: getMonthlyIncome.test.js

const getMonthlyIncome = require('../../src/routes/v1/getMonthlyIncome');
const db = require('../../src/database');
const logger = require('../../src/logger');

// Mock the external dependencies
jest.mock('../../src/database');
jest.mock('../../src/logger');

// Adjusting the mock setup for the `res` object to include both json and send methods
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn().mockReturnValue({ json: mockJson, send: mockSend });


beforeEach(() => {
    // Clear mock calls before each test
    mockSend.mockClear();
    mockJson.mockClear();
    mockStatus.mockClear();
});


describe('getMonthlyIncome', () => {
    // Mock setup adjusted for method chaining with both json and send methods
    const mockSend = jest.fn();
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson, send: mockSend });
    const mockRes = { status: mockStatus };

    beforeEach(() => {
        mockSend.mockClear();
        mockJson.mockClear();
        mockStatus.mockClear();
    });

    test('successfully retrieves monthly income data', async () => {
        // Mock db.query to simulate successful data retrieval
        db.query.mockImplementation((query, callback) => {
            callback(null, [{ month: 'January', totalAmount: 1000 }]);
        });

        const mockReq = {};
        await getMonthlyIncome(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith([{ month: 'January', totalAmount: 1000 }]);
    });

    test('handles database errors', async () => {
        // Mock db.query to simulate a database error
        db.query.mockImplementation((query, callback) => {
            callback(new Error('Database error'), null);
        });

        const mockReq = {};
        await getMonthlyIncome(mockReq, mockRes);

        expect(logger.error).toHaveBeenCalledWith('Error fetching monthly income:', expect.any(Error));
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockSend).toHaveBeenCalledWith('Error fetching monthly income');
    });
});