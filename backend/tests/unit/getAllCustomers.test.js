// File: getAllCustomers.test.js
// author: heaven

const getCustomers = require('../../src/routes/v1/getAllCustomers'); // Adjust the path to the actual file location
const db = require('../../src/database');
const logger = require('../../src/logger');

// Mock the external dependencies
jest.mock('../../src/database');
jest.mock('../../src/logger');

describe('getCustomers', () => {
    const mockSend = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockSend, json: mockSend });
    const mockRes = { status: mockStatus };
    const mockReq = {}; // Assuming no request body or params are needed for this test

    beforeEach(() => {
        // Clear mock calls before each test
        mockSend.mockClear();
        mockStatus.mockClear();
    });

    test('successfully retrieves customers', async () => {
        const mockCustomers = [{ id: 1, name: 'John Doe' }];
        db.query.mockImplementation((sql, callback) => {
            callback(null, mockCustomers);
        });

        await getCustomers(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockSend).toHaveBeenCalledWith(mockCustomers);
    });

    test('returns 404 when no customers are found', async () => {
        db.query.mockImplementation((sql, callback) => {
            callback(null, []);
        });

        await getCustomers(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(404);
        expect(mockSend).toHaveBeenCalledWith('No Customers found');
    });

    test('handles database errors', async () => {
        db.query.mockImplementation((sql, callback) => {
            callback(new Error('Database error'), null);
        });

        await getCustomers(mockReq, mockRes);

        expect(logger.error).toHaveBeenCalledWith('Error fetching customers:', expect.any(Error));
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockSend).toHaveBeenCalledWith('Error fetching customers');
    });


});